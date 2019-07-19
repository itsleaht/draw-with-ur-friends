import { setUserAction, User, setRoomAction, Room, Pen, setDrawPenAction } from './types'
import { SET_USER, SET_ROOM, SET_DRAW_PEN } from './actionTypes'

export function setUser(user: User): setUserAction {
  return {
    type: SET_USER,
    payload: user
  }
}

export function setRoom(room: Room): setRoomAction {
  return {
    type: SET_ROOM,
    payload: room
  }
}

export function setDrawPen(pen: Pen): setDrawPenAction {
  return {
    type: SET_DRAW_PEN,
    payload: pen
  }
}
