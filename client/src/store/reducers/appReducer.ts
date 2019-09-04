import { ActionTypes } from '../actionTypes'

import { AppState } from '../types'

const initialState: AppState = {
  user: {id: '',},
  room: {id: '', name: '', users: []},
  rooms: [],
  isRoomPanelOpen: false,
  drawPoints: []
}

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case ActionTypes.SetUser:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id
        }
      }

    case ActionTypes.SetRoom:
      return {
        ...state,
        room: {
          ...state.room,
          id: action.payload.id,
          name: action.payload.name,
          users: action.payload.users ? action.payload.users : []
        }
      }

    case ActionTypes.SetRooms:
      return {
        ...state,
        rooms: action.payload.rooms
      }

    case ActionTypes.SetIsRoomPanelOpen:
      return {
        ...state,
        isRoomPanelOpen: action.payload
      }

    case ActionTypes.SetDrawPoints:
      const formerDrawPoints = state.drawPoints
      formerDrawPoints.push(action.payload.drawPoint)
      return {
        ...state,
        drawPoints: formerDrawPoints
      }

    default:
      return state
  }
}

export default appReducer
