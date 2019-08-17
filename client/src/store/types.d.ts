import { ActionTypes } from './actionTypes';
import { IRoom } from './../@types'

export interface User {
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
  payload: IRoom
}

export interface setRoomsAction {
  type: typeof ActionTypes.SetRooms
  payload: IRoom[]
}


export interface setPenAction {
  type: typeof ActionTypes.SetPen
  payload: Pen
}

export interface AppState {
  user: User,
  room: IRoom,
  rooms: IRoom[]
}

export interface DrawState {
  pen: Pen
}

export interface State {
  app: AppState,
  draw: DrawState
}
