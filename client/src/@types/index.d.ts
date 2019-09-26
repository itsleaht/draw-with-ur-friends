export interface IUser {
  id: string,
  createdAt: number,
  name: string,
  color: string,
  initial: string,
  rooms?: [],
}

export interface IMessage {
  createdAt: number,
  from: IUser,
  content: string,
  roomId: string
}

export interface Line {
  [index: number]: number | string;
}

export interface LineIndex {
  brush: number,
  color: number,
  x: number,
  y: number,
  pX: number,
  pY: number
}

export interface IRoom {
  id: string,
  name: string,
  users?: IUser[],
  drawLines?: Line[],
  messages: IMessage[]
}

export interface IRoomJoin {
  id?: string,
  name?: string,
  drawLines?: Line[]
}

export interface IRoomJoined {
  from: IRoom,
  to: IRoom
}

export interface IRGB {
  rgb: {r: number, g: number, b: number}
}

type ColorState = {
  hex: string,
  rgb: IRGB.rgb,
  hsl: {h: number, s: number, l: number},
  hsv: {h: number, s: number, v: number}
}
