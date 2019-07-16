import { Socket } from 'socket.io';
import User from './../models/User';

import { Events, IChatUserMessageEvent } from './../events';
import Message from './../models/Message';

import { addLog } from './../helpers/Utils';
import UserManager from './../managers/UserManager';

interface IMessageHandler {
  io: SocketIO.Server;
  socket: Socket;
  roomId: string;
}

export default class MessageHandler {
  public static handle(handler: IMessageHandler): void {
    handler.socket.in(handler.roomId).on(Events.ChatUserMessage, ( event: IChatUserMessageEvent) => {
      const user = UserManager.getUser(event.userId);

      const newMessage: Message = new Message({
        content: event.content,
        from: user ? user : null,
        roomId: event.roomId
      });

      handler.io.in(event.roomId).emit(Events.ChatUserMessage, newMessage);
      addLog('emit', Events.ChatUserMessage, `${JSON.stringify(event)} - ${event.roomId}`);
    });
  }
}
