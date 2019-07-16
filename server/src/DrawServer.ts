import events from './events';
import MessageHandler from './handlers/MessageHandler';
import { addLog } from './helpers/Utils';
import Message from './models/Message';
import Room from './models/Room';
import User from './models/User';

export class DrawServer {
  private io: SocketIO.Server;
  private users: Map<string, User> = new Map();
  private rooms: Map<string, Room> = new Map();
  private defaultRoom: Room | null = null;
  private port: string | number;
  private socket: any = null;

  constructor(io: SocketIO.Server, port: string | number) {
    this.io = io;
    this.port = port;

    this.defaultRoom = this.createRoom('DWUF');
  }

  public connect(): void {
    this.io.on('connect', (socket: any) => {
      addLog('func', 'connect', `Connected client on port ${this.port}`);

      const user: User = this.createUser(socket);

      if (this.defaultRoom !== null) {
        socket.emit(events.ROOM_DEFAULT, this.defaultRoom);
        addLog('emit', events.ROOM_DEFAULT, this.defaultRoom.getId());
      }

      socket.on(events.ROOM_JOIN, (room: {from: {id: '', name: ''}, to: {id: '', name: ''}}) => {
        let roomId: string = room.to && room.to.id ? room.to.id : '';
        const previousRoom = room.from;

        addLog('on', events.ROOM_JOIN, JSON.stringify(room));
        this.removeListeners(socket, previousRoom.id);

        if (previousRoom.id !== roomId && !roomId && !this.rooms.has(roomId)) { // Create a room
          const newRoom = this.createRoom(room.to.name);
          roomId = newRoom.getId();
        }

        socket.leave(previousRoom.id, () => {
          this.joinRoom(socket, user, roomId, previousRoom.id);
        });

        socket.on(events.SERVER_GET_EVENTS, () => socket.emit(events.SERVER_GET_EVENTS, events));

        socket.on(events.USER_NAME, (event: {username: '', userId: ''}) => this.onUserName(event));

        MessageHandler.handle({io: this.io, roomId, socket, users: this.users});
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');

        socket.leave(socket._rooms[0]);
        this.leaveAllRooms(socket);
      });
    });
  }

  protected removeListeners(socket: SocketIO.Socket, roomId: string): void {
    Object.keys(events).forEach( (key) => {
      socket.removeAllListeners(key);
    });
  }

  protected createUser(socket: any): User {
    const user = new User({ id: socket.id });
    this.users.set(socket.id, user);

    socket.emit(events.USER_INFO, user);
    addLog('func', 'createUser', JSON.stringify(user));

    return user;
  }

  protected createRoom(name: string): Room {
    const room = new Room({name});
    this.rooms.set(room.getId(), room);

    addLog('func', 'createRoom:name', JSON.stringify(name));
    addLog('func', 'createRoom', JSON.stringify(room));

    return room;
  }

  protected getRooms(): [] {
    const rooms = [] as any;
    this.rooms.forEach((item: Room) => {
      rooms.push(item.getRoomObject());
    });
    return rooms;
  }

  protected removeUserFromRoom(roomId: string, userId: string): void {
    this.rooms!.get(roomId)!.removeUser(userId);
  }

  protected onUserName(info: {username: '', userId: ''}): void {
    if (this.users.has(info.userId)) {
      this.users.get(info.userId)!.setName(info.username);

      addLog('on', events.USER_NAME, JSON.stringify(this.users.get(info.userId)));
    }
  }

  protected leaveAllRooms(socket: any) {
    const rooms = socket._rooms;
    rooms.forEach((id: string) => {
      if (this.rooms.has(id)) {
        this.removeUserFromRoom(id, socket.id);
      }
    });
    this.io.emit(events.ROOMS_GET, this.getRooms());
  }

  protected joinRoom(socket: any, user: User, roomId: string, previousRoomId: string) {
    socket.join(roomId, (test: any) => {
      const room = this.rooms.get(roomId);
      room!.addUser(user);

      addLog('func', 'join:room', JSON.stringify(room));

      this.io.to(socket.id).emit(events.ROOM_JOINED, {
        from: {id: previousRoomId},
        to: {id: roomId, name: room!.getName()},
        user: socket.id
      });
      addLog('emit', events.ROOM_JOINED, JSON.stringify({
        from: {id: previousRoomId}, to: {id: roomId}, user: socket.id}));

      this.io.emit(events.ROOMS_GET, this.getRooms());
      this.io.in(roomId).emit(events.USERS_GET, Array.from(room!.getUsers().values()));
    });
  }
}
