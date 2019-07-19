import { setUserAction, User, setRoomAction, Room, Pen, setPenAction } from './types';

import { ActionTypes } from './actionTypes';

export function setUser(user: User): setUserAction {
  return {
    type: ActionTypes.SetUser,
    payload: user
  }
}

export function setRoom(room: Room): setRoomAction {
  return {
    type: ActionTypes.SetRoom,
    payload: room
  }
}

export function setPen(pen: Pen): setPenAction {
  return {
    type: ActionTypes.SetPen,
    payload: pen
  }
}
