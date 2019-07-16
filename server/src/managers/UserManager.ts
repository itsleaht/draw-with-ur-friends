import { Events } from './../events';
import User from './../models/User';

import { addLog } from './../helpers/Utils';

class UserManager {
  private users: Map<string, User> = new Map();

  public connect(socket: any) {
    const user = new User({ id: socket.id });
    this.users.set(socket.id, user);
    socket.emit(Events.UserInfo, user);

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
}

export default new UserManager();
