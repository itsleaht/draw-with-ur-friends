import { Events, SocketEvents } from './events';

import RoomManager from './managers/RoomManager';
import UserManager from './managers/UserManager';

import Room from './models/Room';
import User from './models/User';

import RoomHandler from './handlers/RoomHandler';
import UserHandler from './handlers/UserHandler';

import { addLog } from './helpers/Utils';

export class DrawServer {
  private io: SocketIO.Server;
  private users: Map<string, User> = new Map();
  private rooms: Map<string, Room> = new Map();

  private port: string | number;

  constructor(io: SocketIO.Server, port: string | number) {
    this.io = io;
    this.port = port;

    RoomManager.setIo(this.io);
    RoomManager.createDefaultRoom('DWUF');
  }

  public connect(): void {
    this.io.on(SocketEvents.Connect, (socket: any) => {
      addLog('func', SocketEvents.Connect, `Connected client on port ${this.port}`);

      socket.emit(Events.ServerGetIsReady, { isReady: true });

      const user: User = UserManager.connect(socket);

      RoomManager.connect(socket);

      RoomHandler.handle({io: this.io, socket});

      UserHandler.handle({socket});

      socket.on(Events.ServerGetEvents, () => socket.emit(Events.ServerGetEvents, Object.keys(Events)));
    });
  }

  protected removeUserFromRoom(roomId: string, userId: string): void {
    this.rooms!.get(roomId)!.removeUser(userId);
  }

  protected onUserName(info: {username: '', userId: ''}): void {
    if (this.users.has(info.userId)) {
      this.users.get(info.userId)!.setName(info.username);

      addLog('on', Events.UserName, JSON.stringify(this.users.get(info.userId)));
    }
  }
}
