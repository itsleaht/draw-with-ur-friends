import { Socket } from 'socket.io';
import User from './../models/User';

import events, {IChatUserMessageEvent} from './../events';
import Message from './../models/Message';

import { addLog } from './../helpers/Utils';

interface IMessageHandler {
  io: SocketIO.Server;
  socket: Socket;
  users: Map<string, User>;
  roomId: string;
}

export default class MessageHandler {
  public static handle(handler: IMessageHandler): void {
    handler.socket.in(handler.roomId).on(events.CHAT_USER_MESSAGE, ( event: IChatUserMessageEvent) => {
      const user = handler.users.get(event.userId);

      const newMessage: Message = new Message({
        content: event.content,
        from: user ? user : null,
        roomId: event.roomId
      });

      handler.io.in(event.roomId).emit(events.CHAT_USER_MESSAGE, newMessage);
      addLog('emit', events.CHAT_USER_MESSAGE, `${JSON.stringify(event)} - ${event.roomId}`);
    });
  }
}
