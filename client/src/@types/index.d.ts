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


type ColorState = {
  hex: string,
  rgb: {r: number, g: number, b: number},
  hsl: {h: number, s: number, l: number},
  hsv: {h: number, s: number, v: number}
}
