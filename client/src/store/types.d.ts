import { ActionTypes } from './actionTypes';

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
  type: typeof ActionTypes.SetUser
  payload: User
}

export interface setRoomAction {
  type: typeof ActionTypes.SetRoom
  payload: Room
}


export interface setPenAction {
  type: typeof ActionTypes.SetPen
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
