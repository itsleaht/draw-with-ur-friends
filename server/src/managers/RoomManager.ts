import Room from './../models/Room';
import User from './../models/User';

import { Events, IRoomJoin } from './../events';

import { addLog } from './../helpers/Utils';

class RoomManager {
  private defaultRoom: Room = new Room({name: ''});
  private rooms: Map<string, Room> = new Map();

  private io: SocketIO.Server | any = null;

  public connect(socket: any) {
    socket.emit(Events.RoomDefault, this.defaultRoom);
    addLog('emit', Events.RoomDefault, {
      id: this.defaultRoom.getId(),
      name: this.defaultRoom.getName()
    });
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
    if (this.rooms.has(id) || this.defaultRoom.getId() === id) {
      return true;
    }
  }

  public clearDraw(roomId: string): Room {
    const room = this.getRoom(roomId);

    if (room) {
      room.clearDrawLines();
      this.setRoom(room);

      addLog('func', 'clearDraw', JSON.stringify({ roomId: room.getId(), drawLines: room.getDrawLines().length }));
    }

    return this.getRoom(roomId)!;
  }

  public createRoom(name: string) {
    const room = new Room({name});
    this.setRoom(room);

    addLog('func', 'createRoom', JSON.stringify({ name, roomId: room.getId() }));

    return room;
  }

  public setRoom(room: Room) {
    this.rooms.set(room.getId(), room);
  }

  public createDefaultRoom(name: string) {
    this.defaultRoom = this.createRoom(name);
    return this.defaultRoom;
  }

  public leaveRoom(user: User, roomId: string): Room | undefined {
    const room = this.rooms.get(roomId);

    if (room) {
      room.removeUser(user.getId());
      if (room.getUsers().size > 0 ) {
        this.setRoom(room);
      } else {
        room.clearDrawLines();
        room.clearMessages();
        this.rooms.set(roomId, room);
        this.handleDelete(roomId);
      }
    }

    return room;

  }

  public joinRoom(socket: any, user: User, event: IRoomJoin) {
    socket.join(event.to.id, () => {
      const room = this.rooms.get(event.to.id!);

      if (room) {
        room!.addUser(user);

        const logRoom = { ...room, drawLines: [], messages: [] };
        addLog('func', 'join:room', JSON.stringify(logRoom));

        let previousRoom = null;
        if (event.from.id) {
          previousRoom = this.leaveRoom(user, event.from.id);
        }

        this.setRoom(room);

        this.io.to(socket.id).emit(Events.RoomJoined, {
          from: previousRoom,
          to: room
        });

        addLog('emit', Events.RoomJoined, JSON.stringify(logRoom));

        this.io.emit(Events.RoomsGet, this.serialize);
        this.io.in(event.to.id).emit(Events.UsersGet, this.getUserSerialize(room));
      }
    });
  }

  public handleDelete(id: string) {
    if (this.exists(id)) {
      if (id !== this.defaultRoom.getId()) {
        this.rooms.delete(id);
      }

      this.io.emit(Events.RoomsGet, this.serialize);
    }
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
