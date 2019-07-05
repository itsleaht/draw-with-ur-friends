import Message from './models/Message';
import User from './models/User';

const events = {
  CHAT_USER_MESSAGE: 'chat:message',
  ROOM_CREATED: 'room:created',
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
  private users: User[] = [];
  private port: string | number;
  private socket: SocketIO.Socket | null = null;

  constructor(io: SocketIO.Server, port: string | number) {
    this.io = io;
    this.port = port;
  }

  public connect(): void {
    this.io.on('connect', (socket: any) => {
      this.socket = socket;
      console.log('Connected client on port %s.', this.port);

      this.createUser();

      socket.on(events.SERVER_GET_EVENTS, () => this.io.emit(events.SERVER_GET_EVENTS, events));

      socket.on(events.USER_NAME, this.onUserName.bind(this));

      socket.on(events.CHAT_USER_MESSAGE, this.onUserMessage.bind(this));

      socket.on('disconnect', () => {
        console.log('Client disconnected');
        // todo : remove user from room & remove user from DrawServer.user
        // todo: emit user disconnect
      });
    });
  }

  protected createUser(): void {
    if (!this.socket) {
      return;
    }
    const user = new User({ id: this.socket.id });
    this.users.push(user);

    this.socket.emit(events.USER_INFO, user);
  }

  protected onUserName(info: {username: string}): void {
    const matchingUser: {item: any, index: number } = findByIdWithIndex(this.users, info.username);
    matchingUser.item.setName(info.username);

    this.users.splice(matchingUser.index, 1);
    this.users.push(matchingUser.item);

    addLog('on', events.USER_NAME, JSON.stringify(matchingUser.item));
  }

  protected onUserMessage(message: {content: '', userId: ''}): void {
    const matchingUser = findById(this.users, message.userId);
    const newMessage: Message = new Message({
      content: message.content,
      from: matchingUser ? matchingUser : null,
    });

    addLog('on', events.CHAT_USER_MESSAGE, JSON.stringify(message));
    this.io.emit('chat:message', newMessage);
  }
}
