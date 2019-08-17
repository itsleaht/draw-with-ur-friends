export interface IUser {
  id: string,
  createdAt: number,
  name: string,
  rooms?: []
}

export interface IMessage {
  createdAt: number,
  from: IUser,
  content: string,
  roomId: string
}

export interface IRoom {
  id: string,
  // createdAt: number,
  // host: UserI,
  name: string,
  users?: IUser[]
}

export interface IRoomJoin {
  id?: string;
  name?: string;
}

export interface IRoomJoined {
  from: IRoomJoin;
  to: IRoomJoin;
}
