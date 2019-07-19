import { SET_USER, SET_ROOM, SET_DRAW_PEN } from './actionTypes';

export interface User {
  id: string,
  name?: string
}

export interface Room {
  id: string,
  name?: string
}

export interface Pen {
  index: string
}

export interface setUserAction {
  type: typeof SET_USER
  payload: User
}

export interface setRoomAction {
  type: typeof SET_ROOM
  payload: Room
}


export interface setPenAction {
  type: typeof SET_PEN
  payload: Pen
}

export interface AppState {
  user: User,
  room: Room
}

export interface DrawState {
  pen: Pen
}

export interface State {
  app: AppState,
  draw: DrawState
}
