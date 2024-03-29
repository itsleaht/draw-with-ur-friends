import { ILine } from './models/Room';

export enum SocketEvents {
  Connect = 'connect',
  Disconnect = 'disconnect',
}

export enum Events {
  RoomAddMessage = 'room:add:message',
  RoomGetMessages = 'rooms:get:messages',
  RoomGetNewMessage = 'rooms:get:new:message',
  RoomsGet = 'rooms:get',
  RoomCreate = 'room:create',
  RoomDefault = 'room:default',
  RoomJoin = 'room:join',
  RoomJoined = 'room:joined',
  RoomAddDrawLine = 'room:add:drawLine',
  RoomGetDrawLines = 'room:get:drawLines',
  RoomClearDraw = 'room:clear:draw',
  ServerGetEvents = 'server:get:events',
  ServerGetIsReady = 'server:get:isReady',
  UsersGet = 'users:get',
  UserConnection = 'user:connection',
  UserGet = 'user:get',
  UserLogin = 'user:login',
  UserName = 'user:name',
  AlertNew = 'alert:new'
}

interface IRoom {
  id?: string;
  name?: string;
}

export interface IRoomAddMessageEvent {
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
