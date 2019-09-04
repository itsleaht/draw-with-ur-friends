import { setUserAction, User, setRoomAction, setRoomsAction, Brush, setBrushAction, setColorAction, Color, SetIsRoomPanelOpenAction, Point } from './types'
import { IRoom } from './../@types'

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

export function SetIsRoomPanelOpen(isRoomPanelOpen: boolean): SetIsRoomPanelOpenAction {
  return {
    type: ActionTypes.SetIsRoomPanelOpen,
    payload: isRoomPanelOpen
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

export function setDrawPoints(drawPoint: Point) {
  return {
    type: ActionTypes.SetDrawPoints,
    payload: drawPoint
  }
}
