import { Events } from './../events';
import User from './../models/User';

import { addLog } from './../helpers/Utils';

class UserManager {
  private users: Map<string, User> = new Map();

  public connect(socket: any) {
    const user = new User({ id: socket.id });
    this.users.set(socket.id, user);
    socket.emit(Events.UserGet, user);

    addLog('func', 'createUser', JSON.stringify(user));

    return user;
  }

  public exists(id: string) {
    return this.users.has(id);
  }

  public getUser(id: string) {
    if (this.exists(id)) {
      return this.users.get(id);
    }
  }

  get serialize(): [] {
    const users = [] as any;
    this.users.forEach((user: User) => {
      users.push(user.serialize);
    });
    return users;
  }
}

export default new UserManager();
