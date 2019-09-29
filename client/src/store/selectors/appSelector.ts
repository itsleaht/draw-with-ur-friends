import { createSelector } from 'reselect'
import { State } from '../types'

const getRooms = (state: State, id: string) => {
  const rooms = state.app.rooms
  let index = -1
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].id === state.app.room.id) {
      index = i
      break
    }
  }

  if (index > 0) {
    const room = rooms[index]
    rooms.splice(index, 1)
    rooms.unshift(room)
  }

  return rooms
}

const appSelector = {
  roomsOrdered: createSelector(getRooms, (rooms) => rooms),
  rooms: createSelector((state: State) => state.app.rooms, (value) => value),
  user: createSelector((state: State) => state.app.user, (value) => value),
  room: createSelector((state: State) => state.app.room, (value) => value),
  roomId: createSelector((state: State) => state.app.room.id, (value) => value),
  messages: createSelector((state: State) => state.app.room.messages, (value) => value),
  isRoomPanelOpen: createSelector((state: State) => state.app.ui.isRoomPanelOpen, (value) => value),
  isServerReady: createSelector((state: State) => state.app.server.isReady, (value) => value),
  alerts: createSelector((state: State) => state.app.server.alerts, (value) => value),
  canDraw: createSelector((state: State) => state.app.ui.canDraw, (value) => value)
}

export default appSelector
