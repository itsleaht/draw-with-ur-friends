import Utils from '../helpers/Utils';

import Message from './Message';
import User from './User';

export interface ILine {
  brush: IBrush;
  color: IColor;
  posRatio: {
    x: number,
    y: number,
    pX: number,
    pY: number
  };
}

interface IBrush {
  index: string;
}

interface IColor {
  hex: string;
}

interface IRoom {
  name: string;
}

export default class Room {
  private id: string = Utils.uuid();
  private name: string = '';
  private users = new Map<string, User>();
  private drawLines: ILine[] = [];
  private messages: Message[] = [];

  constructor(room: IRoom) {
    this.name = room.name;
  }

  // todo: store room messages & handle retrieving

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUsers(): Map<string, User> {
    return this.users;
  }

  public getDrawLines(): ILine[] {
    return this.drawLines;
  }

  public getUser(userId: string): User {
    return this.users.get(userId)!;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }

  public addUser(user: User): void {
    this.users.set(user.getId(), user);
  }

  public addDrawLine(line: ILine): void {
    this.drawLines.push(line);
  }

  public removeUser(id: string): void {
    this.users.delete(id);
  }

  public updateUser(user: User): void {
    this.addUser(user);
  }

  public get serialize(): {} {
    return {
      drawLines: this.drawLines,
      id: this.id,
      messages: this.messages,
      name: this.name,
      users: Array.from(this.users.values()),
    };
  }
}
