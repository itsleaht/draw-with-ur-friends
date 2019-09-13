import { Socket } from 'socket.io';

import Room from './../models/Room';
import User from './../models/User';

import { Events, IRoomAddMessageEvent } from './../events';
import Message from './../models/Message';

import { addLog } from './../helpers/Utils';

import RoomManager from './../managers/RoomManager';
import UserManager from './../managers/UserManager';

interface IMessageHandler {
  io: SocketIO.Server;
  socket: Socket;
  roomId: string;
}

export default class MessageHandler {
  public static handle(handler: IMessageHandler): void {
    handler.socket.in(handler.roomId).on(Events.RoomAddMessage, ( event: IRoomAddMessageEvent) => {
      const user: User | undefined = UserManager.getUser(event.userId);

      const newMessage: Message = new Message({
        content: event.content,
        from: user!,
        roomId: event.roomId
      });

      const room: Room | undefined = RoomManager.getRoom(event.roomId);
      if (room) {
        room.addMessage(newMessage);
      }

      handler.io.in(event.roomId).emit(Events.RoomGetNewMessage, newMessage);
      addLog('emit', Events.RoomGetNewMessage, `${JSON.stringify(event)} - ${event.roomId}`);
    });
  }
}
