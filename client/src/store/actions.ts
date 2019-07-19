import { setUserAction, User, setRoomAction, Room, Pen, setPenAction } from './types'
import { SET_USER, SET_ROOM, SET_PEN } from './actionTypes'

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

export function setPen(pen: Pen): setPenAction {
  return {
    type: SET_PEN,
    payload: pen
  }
}
