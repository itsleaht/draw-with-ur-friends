export interface UserI {
  id: string,
  createdAt: number,
  name: string,
  rooms?: []
}

export interface MessageI {
  createdAt: number,
  from: UserI,
  content: string,
  roomId: string
}

export interface RoomI {
  id: string,
  // createdAt: number,
  // host: UserI,
  name: string,
  users: UserI[]
}

interface RoomI {
  id?: string;
  name?: string;
}

export interface RoomJoinedI {
  from: IRoom;
  to: IRoom;
}
