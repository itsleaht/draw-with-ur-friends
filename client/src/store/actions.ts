import { setUserAction, User, setRoomAction, setRoomsAction, Brush, setBrushAction, setColorAction, Color, SetIsRoomPanelOpenAction, setRoomDrawLineAction, SetIsServerReadyAction } from './types'
import { IRoom, Line } from './../@types'

import { ActionTypes } from './actionTypes'

export function setUser(user: User): setUserAction {
  return {
    type: ActionTypes.SetUser,
    payload: user
  }
}

export function setRoom(room: IRoom): setRoomAction {
  return {
    type: ActionTypes.SetRoom,
    payload: room
  }
}

export function setRooms(rooms: IRoom[]): setRoomsAction {
  return {
    type: ActionTypes.SetRooms,
    payload: rooms
  }
}

export function setRoomDrawLine(line: Line[]): setRoomDrawLineAction {
  return {
    type: ActionTypes.SetRoomDrawLine,
    payload: line
  }
}

export function SetIsRoomPanelOpen(isRoomPanelOpen: boolean): SetIsRoomPanelOpenAction {
  return {
    type: ActionTypes.SetIsRoomPanelOpen,
    payload: isRoomPanelOpen
  }
}

export function setIsServerReady(isServerReady: boolean): SetIsServerReadyAction {
  return  {
    type: ActionTypes.SetIsServerReady,
    payload: isServerReady
  }
}

export function setBrush(brush: Brush): setBrushAction {
  return {
    type: ActionTypes.SetBrush,
    payload: brush
  }
}

export function setColor(color: Color): setColorAction {
  return {
    type: ActionTypes.SetColor,
    payload: color
  }
}
