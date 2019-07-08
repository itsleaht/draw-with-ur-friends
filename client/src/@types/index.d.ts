export interface UserI {
  id: string,
  createdAt: number,
  name: string
}

export interface MessageI {
  createdAt: number,
  from: UserI,
  content: string
}

export interface RoomI {
  id: string,
  // createdAt: number,
  // host: UserI,
  name: string,
  // users: UserI[]
}
