import { Socket } from 'socket.io';

import { Events, IAddDrawPoint, IRoomJoin } from './../events';

import { addLog } from './../helpers/Utils';

import RoomManager from './../managers/RoomManager';
import UserManager from './../managers/UserManager';

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
      addLog('on', Events.RoomJoin, JSON.stringify(event));

      const previousRoom = event.from;

      this.removeListeners(socket);

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
      });

      io.in(event.to.id).on(Events.RoomAddDrawPoint, (newEvent: IAddDrawPoint) => {
        const roomId = event.to.id ? event.to.id : '';
        io.in(roomId).emit(Events.RoomAddDrawPoint, newEvent.point);
      });

      io.in(event.to.id).on(Events.RoomGetDrawPoints, (roomId: string) => {
        const room = RoomManager.getRoom(roomId);
        io.in(roomId).emit(Events.RoomAddDrawPoint, room!.getDrawPoints());
      });

      MessageHandler.handle({io, socket, roomId: event.to.id});
    });
  }

  protected static removeListeners(socket: SocketIO.Socket): void {
    Object.keys(Events).forEach( (key) => {
      socket.removeAllListeners(key);
    });
  }
}
