import Room from './../models/Room';
import User from './../models/User';

import events, {IChatUserMessageEvent} from './../events';
import Message from './../models/Message';

import { addLog } from './../helpers/Utils';

interface IMessageHandler {
  io: SocketIO.Server;
  socket: any;
  users: Map<string, User>;
  roomId: string;
}

export default class MessageHandler {

  private socket: any;
  private io: SocketIO.Server;
  private users: Map<string, User>;
  private roomId: string;

  constructor(handler: IMessageHandler) {
    this.io = handler.io;
    this.socket = handler.socket;

    this.users = handler.users;
    this.roomId = handler.roomId;
  }

  public handle(): void {
    this.socket.in(this.roomId).on(events.CHAT_USER_MESSAGE, (
      event: IChatUserMessageEvent) => this.onUserMessage(event));
 }

  private onUserMessage(event: IChatUserMessageEvent): void {
    const user = this.users.get(event.userId);

    const newMessage: Message = new Message({
      content: event.content,
      from: user ? user : null,
      roomId: event.roomId
    });

    this.io.in(event.roomId).emit(events.CHAT_USER_MESSAGE, newMessage);
    addLog('emit', events.CHAT_USER_MESSAGE, `${JSON.stringify(event)} - ${event.roomId}`);
  }
}
