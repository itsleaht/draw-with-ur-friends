import User from './User';

interface IMessage {
  from: User;
  content: string;
  roomId: string;
}

export default class Message {
  public createdAt: number;
  public from: User;
  public content: string;
  public roomId: string;

  constructor(message: IMessage) {
    this.createdAt = Date.now();
    this.from = message.from;
    this.content = message.content;
    this.roomId = message.roomId;
  }
}
