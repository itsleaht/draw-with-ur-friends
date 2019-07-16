import Room from './../models/Room';
import User from './../models/User';

import { Events, IRoomJoin } from './../events';

import { addLog } from './../helpers/Utils';

class RoomManager {
  private defaultRoom: Room = new Room();
  private rooms: Map<string, Room> = new Map();

  private io: SocketIO.Server | any = null;

  public connect(socket: any) {
    socket.emit(Events.RoomDefault, this.defaultRoom);
    addLog('emit', Events.RoomDefault, this.defaultRoom.getId());
  }

  public setIo(io: SocketIO.Server) {
    this.io = io;
  }

  public getRoom(id: string) {
    if (this.rooms.has(id)) {
      return this.rooms.get(id);
    }
  }

  public exists(id: string) {
    if (this.rooms.has(id) || this.defaultRoom.getId() !== id) {
      return true;
    }
  }

  public createRoom(name: string) {
    const room = new Room({name});
    this.rooms.set(room.getId(), room);

    addLog('func', 'createRoom:name', JSON.stringify(name));
    addLog('func', 'createRoom', JSON.stringify(room));

    return room;
  }

  public createDefaultRoom(name: string) {
    this.defaultRoom = this.createRoom(name);
    return this.defaultRoom;
  }

  public joinRoom(socket: any, user: User, event: IRoomJoin) {
    socket.join(event.to.id, () => {
      const room = this.rooms.get(event.to.id!);

      if (room) {
        room!.addUser(user);

        addLog('func', 'join:room', JSON.stringify(room));

        const roomJoined = {
          ...event,
          user: socket.id
        };
        this.io.to(socket.id).emit(Events.RoomJoined, roomJoined);

        addLog('emit', Events.RoomJoined, JSON.stringify(roomJoined));

        this.io.emit(Events.RoomsGet, this.serialize);
        this.io.in(event.to.id).emit(Events.UsersGet, this.getUserSerialize(room));
      }
    });
  }

  get serialize(): [] {
    const rooms = [] as any;
    this.rooms.forEach((room: Room) => {
      rooms.push(room.serialize);
    });
    return rooms;
  }

  private getUserSerialize(room: Room): User[] {
    return Array.from(room!.getUsers().values());
  }
}

export default new RoomManager();
