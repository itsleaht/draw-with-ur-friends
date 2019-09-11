import { ILine } from './models/Room';

export enum SocketEvents {
  Connect = 'connect',
  Disconnect = 'disconnect',
}

export enum Events {
  ChatUserMessage = 'chat:message',
  RoomsGet = 'rooms:get',
  RoomCreate = 'room:create',
  RoomDefault = 'room:default',
  RoomJoin = 'room:join',
  RoomJoined = 'room:joined',
  RoomAddDrawLine = 'room:add:drawLine',
  RoomGetDrawLines = 'room:get:drawLines',
  ServerGetEvents = 'server:get:events',
  ServerGetIsReady = 'server:get:isReady',
  UsersGet = 'users:get',
  UserConnection = 'user:connection',
  UserGet = 'user:get',
  UserLogin = 'user:login',
  UserName = 'user:name'
}

interface IRoom {
  id?: string;
  name?: string;
}

export interface IChatUserMessageEvent {
  content: string;
  userId: string;
  roomId: string;
}

export interface IUserNameEvent {
  name: string;
  id: string;
}

export interface IRoomJoin {
  from: IRoom;
  to: IRoom;
}

export interface IAddDrawLine {
  room: IRoom;
  drawLine: ILine;
}
