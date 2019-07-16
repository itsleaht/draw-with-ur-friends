import Room from './Room';

interface IUser {
  id: string;
}


export default class User {
  private id: string = '';
  private createdAt: number = Date.now();
  private name: string = 'johndoe';
  private rooms: Map<string, Room> = new Map();

  constructor(user: IUser) {
    this.id = user.id;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
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
}
