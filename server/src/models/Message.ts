import User from './User';

export default class Message {
  public createdAt: number;
  public from: User | null;
  public content: string;

  constructor({from, content}: {from: User | null, content: string}) {
    this.createdAt = Date.now();
    this.from = from;
    this.content = content;
  }
}
