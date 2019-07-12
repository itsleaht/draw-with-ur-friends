import User from './User';

export default class Message {
  public createdAt: number;
  public from: User | null;
  public content: string;
  public roomId: string;

  constructor({from, content, roomId}: {from: User | null, content: string, roomId: string}) {
    this.createdAt = Date.now();
    this.from = from;
    this.content = content;
    this.roomId = roomId;
  }
}
