import { ActionTypes } from '../actionTypes'

import { AppState } from '../types'

const initialState: AppState = {
  user: {id: '',},
  room: {id: '', name: '', users: [], drawLines: [], messages: []},
  rooms: [],
  ui: {
    canDraw: false,
    isRoomPanelOpen: false,
  },
  server: {
    isReady: false
  }
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
          users: action.payload.users ? action.payload.users : [],
          drawLines: action.payload.drawLines,
          messages: action.payload.messages
        }
      }

    case ActionTypes.SetRoomMessage:
      const messages = state.room.messages
      messages.push(action.payload.message)
      return {
        ...state,
        room: {
          ...state.room,
          messages: messages
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
        ui: {
          ...state.ui,
          isRoomPanelOpen: action.payload
        }
      }

    case ActionTypes.SetIsServerReady:
      return {
        ...state,
        ui: {
          ...state.ui,
          canDraw: action.payload
        },
        server: {
          ...state.server,
          isReady: action.payload
        }
      }

    case ActionTypes.SetCanDraw:
      return {
        ...state,
        ui: {
          ...state.ui,
          canDraw: action.payload
        }
      }

    case ActionTypes.SetRoomDrawLine:
      const drawLines = state.room.drawLines
      drawLines!.push(action.payload.drawLine)
      return {
        ...state,
        room: {
          ...state.room,
          drawLines: drawLines
        }
      }

    default:
      return state
  }
}

export default appReducer
