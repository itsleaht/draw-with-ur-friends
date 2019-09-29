import { ActionTypes } from './actionTypes';
import { IRoom, IMessage } from './../@types'

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


export interface Line {
  [index: number]: number | string;
}

export interface Alert {
  id: string,
  type: string,
  content: string
}

export interface addAlert {
  type: typeof ActionTypes.AddAlert
  payload: Alert
}

export interface removeAlert {
  type: typeof ActionTypes.RemoveAlert
  payload: string
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

export interface setRoomMessageAction {
  type: typeof ActionTypes.setRoomMessage,
  payload: IMessage
}


export interface setColorAction {
  type: typeof ActionTypes.SetColor
  payload: Color
}

export interface SetIsRoomPanelOpenAction {
  type: typeof ActionTypes.SetIsRoomPanelOpen,
  payload: boolean
}

export interface SetCanDraw {
  type: typeof ActionTypes.SetCanDraw,
  payload: boolean
}

export interface SetIsServerReadyAction {
  type: typeof ActionTypes.SetIsServerReady,
  payload: boolean
}

export interface AppState {
  user: User,
  room: IRoom,
  rooms: IRoom[],
  ui: {
    isRoomPanelOpen: boolean,
    canDraw: boolean
  },
  server: {
    isReady: boolean,
    alerts: array
  }
}

export interface DrawState {
  brush: Brush,
  color: Color
}

export interface State {
  app: AppState,
  draw: DrawState
}
