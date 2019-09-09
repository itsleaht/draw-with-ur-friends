import { ActionTypes } from './actionTypes';
import { IRoom } from './../@types'

export interface User {
  id: string,
  name?: string
}

export interface Brush {
  index: string
}

export interface Color {
  hex: string
}

export interface Point {
  brush: Brush,
  color: Color,
  posRatio: {
    x: number,
    y: number,
    pX: number,
    pY: number
  }
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

export interface setBrushAction {
  type: typeof ActionTypes.SetBrush
  payload: Brush
}

export interface setRoomDrawLineAction {
  type: typeof ActionTypes.SetRoomDrawLine,
  payload: Line
}


export interface setColorAction {
  type: typeof ActionTypes.SetColor
  payload: Color
}

export interface SetIsRoomPanelOpenAction {
  type: typeof ActionTypes.SetIsRoomPanelOpen,
  payload: boolean
}

export interface AppState {
  user: User,
  room: IRoom,
  rooms: IRoom[],
  isRoomPanelOpen: boolean,
  drawPoints: Point[]
}

export interface DrawState {
  brush: Brush,
  color: Color
}

export interface State {
  app: AppState,
  draw: DrawState
}
