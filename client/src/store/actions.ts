import { setUserAction, User, setRoomAction, setRoomsAction, Brush, setBrushAction, setColorAction, Color, setRoomMessageAction, SetIsRoomPanelOpenAction, setRoomDrawLineAction, SetIsServerReadyAction, SetCanDraw, State, addAlert, removeAlert, Alert, setIsChatOpen } from './types'
import { IRoom, Line, IMessage } from './../@types'
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

export function setRoomDrawLine(line: Line): setRoomDrawLineAction {
  return {
    type: ActionTypes.SetRoomDrawLine,
    payload: line
  }
}

export function setRoomMessage(message: IMessage): setRoomMessageAction {
  return {
    type: ActionTypes.SetRoomMessage,
    payload: message
  }
}

export function SetIsRoomPanelOpen(isRoomPanelOpen: boolean): SetIsRoomPanelOpenAction {
  return {
    type: ActionTypes.SetIsRoomPanelOpen,
    payload: isRoomPanelOpen
  }
}

export function setCanDraw(canDraw: boolean): SetCanDraw {
  return {
    type: ActionTypes.SetCanDraw,
    payload: canDraw
  }
}

export function setIsChatOpen(isChatOpen: boolean): setIsChatOpen {
  return {
    type: ActionTypes.SetIsChatOpen,
    payload: isChatOpen
  }
}

export function setIsServerReady(isServerReady: boolean): SetIsServerReadyAction {
  return  {
    type: ActionTypes.SetIsServerReady,
    payload: isServerReady
  }
}

export function addAlert(alert: Alert): addAlert {
  return {
    type: ActionTypes.AddAlert,
    payload: alert
  }
}

export function removeAlert(id: string): removeAlert {
  return {
    type: ActionTypes.RemoveAlert,
    payload: id
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


