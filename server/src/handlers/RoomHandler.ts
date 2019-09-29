import { Socket } from 'socket.io';

import { Events, IAddDrawLine, IRoomJoin } from './../events';

import { addLog } from './../helpers/Utils';

import RoomManager from './../managers/RoomManager';
import UserManager from './../managers/UserManager';

import Alert from './../models/Alert';
import MessageHandler from './MessageHandler';

interface IRoomHandler {
  io: SocketIO.Server;
  socket: Socket;
}

export default class RoomHandler {
  public static handle(handler: IRoomHandler): void {
    const socket = handler.socket;
    const io = handler.io;

    socket.on(Events.RoomJoin, (event: IRoomJoin) => {
      const previousRoom = event.from;

      this.removeListeners(socket);
      MessageHandler.unhandle(socket);

      if (!event.to.id || !RoomManager.exists(event.to.id)) { // Create a room
        const newRoom = RoomManager.createRoom(event.to.name ? event.to.name : 'Automatic Named Room');
        event.to.id = newRoom.getId();
      }

      socket.leave(previousRoom.id!, () => {

        const user = UserManager.getUser(socket.id);
        const room = RoomManager.getRoom(event.to.id ? event.to.id : '');
        event.to.name = room!.getName();

        user!.addToRoom(room!);

        RoomManager.joinRoom(socket, user!, event);

        if (socket.id !== user!.getName()) {
          const leaveAlert: Alert = new Alert('leave',
          `<strong>${user!.getName()}</strong> has left the <strong>${previousRoom.id ? RoomManager.getRoom(previousRoom.id!)!.getName() : ''}</strong>
          artboard !`);
          socket.broadcast.to(previousRoom.id!).emit(Events.AlertNew, leaveAlert);

          const joinAlert: Alert = new Alert('join',
          `<strong>${user!.getName()}</strong> has join the <strong>${room!.getName()}</strong> artboard !`);
          socket.broadcast.to(room!.getId()).emit(Events.AlertNew, joinAlert);
        }

      });

      MessageHandler.handle({io, socket, roomId: event.to.id});
    });

    socket.on(Events.RoomAddDrawLine, (event: IAddDrawLine) => {
      const roomId = event.room.id ? event.room.id : '';
      const room = RoomManager.getRoom(roomId);
      if (room) {
        room.addDrawLine(event.drawLine);
        io.in(roomId).emit(Events.RoomAddDrawLine, event.drawLine);
      }
    });

    socket.on(Events.RoomGetDrawLines, (roomId: string) => {
      const room = RoomManager.getRoom(roomId);
      io.in(roomId).emit(Events.RoomGetDrawLines, room!.getDrawLines());
    });

    socket.on(Events.RoomClearDraw, (roomId: string) => {
      const user = UserManager.getUser(socket.id);

      const room = RoomManager.clearDraw(roomId);
      io.in(roomId).emit(Events.RoomClearDraw, room);

      const alert: Alert = new Alert('clear',
      `<strong>${user!.getName()}</strong> has cleared the <strong>${room.getName()}</strong> artboard !`);
      socket.broadcast.to(roomId).emit(Events.AlertNew, alert);
    });
  }

  protected static removeListeners(socket: SocketIO.Socket): void {
    Object.keys(Events).forEach( (key) => {
      socket.removeAllListeners(key);
    });
  }
}
