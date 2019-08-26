import { setUserAction, User, setRoomAction, setRoomsAction, Brush, setBrushAction, setColorAction, Color } from './types';
import { IRoom } from './../@types'

import { ActionTypes } from './actionTypes';

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
