import { setUserAction, User, setRoomAction, Room } from './types'
import { SET_USER, SET_ROOM } from './actionTypes'

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

