import { setUserAction, User, setRoomAction, setRoomsAction, Pen, setPenAction, setColorAction, Color } from './types';
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

export function setPen(pen: Pen): setPenAction {
  return {
    type: ActionTypes.SetPen,
    payload: pen
  }
}

export function setColor(color: Color): setColorAction {
  return {
    type: ActionTypes.SetColor,
    payload: color
  }
}
