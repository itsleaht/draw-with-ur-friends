import Utils from '../helpers/Utils';
import User from './User';

export default class Room {
  private id: string = Utils.uuid();
  private name: string = '';
  private users = new Map<string, User>();

  constructor({name} = {name: ''}) {
    this.name = name;
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

  public addUser(user: User): void {
    this.users.set(user.getId(), user);
  }

  public removeUser(id: string): void {
    this.users.delete(id);
  }

  public getRoomObject(): {} {
    return {
      id: this.id,
      name: this.name,
      users: Array.from(this.users.values())
    };
  }
}
