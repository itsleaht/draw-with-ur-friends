import Utils from '../helpers/Utils';
import User from './User';

export interface IPoint {
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
  private drawPoints: IPoint[] = [];

  constructor(room: IRoom) {
    this.name = room.name;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUsers(): Map<string, User> {
    return this.users;
  }

  public getDrawPoints(): IPoint[] {
    return this.drawPoints;
  }

  public addUser(user: User): void {
    this.users.set(user.getId(), user);
  }

  public addDrawPoint(point: IPoint): void {
    this.drawPoints.push(point);
  }

  public removeUser(id: string): void {
    this.users.delete(id);
  }

  public get serialize(): {} {
    return {
      id: this.id,
      name: this.name,
      users: Array.from(this.users.values())
    };
  }
}
