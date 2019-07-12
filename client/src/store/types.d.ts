import { SET_USER, SET_ROOM } from './actionTypes';

export interface User {
  id: string
}

export interface Room {
  id: string
}

export interface setUserAction {
  type: typeof SET_USER
  payload: User
}

export interface setRoomAction {
  type: typeof SET_ROOM
  payload: Room
}

export interface State {
  user: User,
  room: Room
}
