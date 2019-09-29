import Room from './Room';

import { getColor } from './../helpers/Utils';

interface IUser {
  id: string;
}

export default class User {
  private id: string = '';
  private createdAt: number = Date.now();
  private name: string = 'johndoe';
  private initial: string = 'J';
  private color: string = getColor();
  private rooms: Map<string, Room> = new Map();

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.id;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getInitialName() {
    return this.initial;
  }

  public setName(name: string) {
    this.name = name;

    this.setInitial();
  }

  public setInitial() {
    const name = this.name;
    this.initial = name.substr(0, 1).toUpperCase();
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public addToRoom(room: Room) {
    this.rooms.set(room.getId(), room);
  }

  public removeFromRoom(roomId: string) {
    this.rooms.delete(roomId);
  }

  public getRooms() {
    return this.rooms;
  }

  public get serialize(): {} {
    return {
      color: this.color,
      createdAt: this.createdAt,
      id: this.id,
      initial: this.initial,
      name: this.name,
      rooms: Array.from(this.rooms.values())
    };
  }
}
