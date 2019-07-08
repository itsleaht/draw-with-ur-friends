import Message from './models/Message';
import Room from './models/Room';
import User from './models/User';

const events = {
  CHAT_USER_MESSAGE: 'chat:message',
  ROOMS_GET: 'rooms:get',
  ROOM_CREATE: 'room:create',
  ROOM_DEFAULT: 'room:default',
  ROOM_JOIN: 'room:join',
  SERVER_GET_EVENTS: 'server:get:events',
  USER_CONNECTION: 'user:connection',
  USER_INFO: 'user:info',
  USER_LOGIN: 'user:login',
  USER_NAME: 'user:name'
};

const findById = ( array: any[], id: number | string) => array.filter( (item) => id === item.id)[0];
const findByIdWithIndex = ( array: any[], id: number | string) => {
  const found: {item: any, index: number} = {item: -1, index: -1};

  for (let i: number = 0; i < array.length; i++) {
    if (array[i] === id) {
      found.item = array[i];
      found.index = i;
    }
  }

  return found;
};

const addLog = (type: string, message: string, params: any) => {
  console.log(`[ ${type.toUpperCase()} ] [ ${message} ] ${params}`);
};

export class DrawServer {
  private io: SocketIO.Server;
  private users = new Map<string, User>();
  private rooms = new Map<string, Room>();
  private defaultRoom: Room | null = null;
  private port: string | number;
  private socket: SocketIO.Socket | null = null;

  constructor(io: SocketIO.Server, port: string | number) {
    this.io = io;
    this.port = port;

    this.defaultRoom = this.createRoom('DWUF');
  }

  public connect(): void {
    this.io.on('connect', (socket: any) => {
      this.socket = socket;
      console.log('Connected client on port %s.', this.port);

      const user = this.createUser();

      if (this.defaultRoom !== null) {
        this.io.emit(events.ROOM_DEFAULT, this.defaultRoom.getId());
        addLog('emit', events.ROOM_DEFAULT, this.defaultRoom.getId());
      }

      socket.on(events.ROOM_JOIN, (room: {from: '', to: ''}) => {

        socket.leaveAll();

        if (user) {
          this.rooms.get(room.to)!.addUser(user);
        }

        addLog('on', events.ROOM_JOIN, `${JSON.stringify(room)} - User : ${socket.id}`);

        socket.join(room.to);

        this.io.emit(events.ROOMS_GET, Array.from(this.rooms.values()) );

        socket.in(room.to).on(events.SERVER_GET_EVENTS, () => this.io.emit(events.SERVER_GET_EVENTS, events));

        socket.in(room.to).on(events.USER_NAME, (event: {username: '', userId: ''}) => this.onUserName(event));

        socket.in(room.to).on(events.CHAT_USER_MESSAGE, (
          event: {content: '', userId: ''}) => this.onUserMessage(event));
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
        socket.leaveAll();
        // todo : remove user from room & remove user from DrawServer.user
        // todo: emit user disconnect
      });
    });
  }

  protected removeListeners(): void {
    Object.keys(events).forEach( (key) => {
      this.socket!.removeAllListeners(key);
    });
  }

  protected createUser(): User | void {
    if (!this.socket) {
      return;
    }
    const user = new User({ id: this.socket.id });
    this.users.set(this.socket.id, user);

    this.socket.emit(events.USER_INFO, user);
    addLog('Func', 'createUser', JSON.stringify(user));

    return user;
  }

  protected createRoom(name: string): Room {
    const room = new Room({name});
    this.rooms.set(room.getId(), room);

    addLog('Func', 'createRoom', JSON.stringify(room));

    return room;
  }

  protected onUserName(info: {username: '', userId: ''}): void {
    if (this.users.has(info.userId)) {
      this.users.get(info.userId)!.setName(info.username);

      addLog('on', events.USER_NAME, JSON.stringify(this.users.get(info.userId)));
    }
  }

  protected onUserMessage(message: {content: '', userId: ''}): void {
    const user = this.users.get(message.userId);
    const newMessage: Message = new Message({
      content: message.content,
      from: user ? user : null,
    });

    addLog('on', events.CHAT_USER_MESSAGE, JSON.stringify(message));
    this.io.emit(events.CHAT_USER_MESSAGE, newMessage);
  }
}
