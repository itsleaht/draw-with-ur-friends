import { Events } from "../config/events"

import { addLog, getLog } from "../helpers/utils"

import { store } from './../store'
import { ActionTypes } from '../store/actionTypes'

import { IUser, IRoomJoined, IRoom, Line } from '../@types'

interface ISocketManager {
  socket: SocketIOClient.Socket
}

class SocketManager {
  private socket: SocketIOClient.Socket | null = null
  private drawLineClb: Function = () => {}
  private getRoomClb: Function = () => {}

  constructor () {
  }

  public setSocket (params: ISocketManager) {
    this.socket = params.socket
    this.init()
  }

  public setClbs (params: {drawLineClb?: Function, getRoomClb?: Function}) {
    if (params.drawLineClb)
      this.drawLineClb = params.drawLineClb

    if (params.getRoomClb)
    this.getRoomClb = params.getRoomClb
  }

  private init() {
    addLog('on', 'SocketManager:init')

    this.listen()
  }

  private listen () {

    this.socket!.on(Events.ServerGetIsReady, (isReady: {isReady: boolean}) => {
      const log = getLog('on', Events.ServerGetIsReady, isReady)
      console.log(log.key, log.value)

      store.dispatch({type: ActionTypes.SetIsServerReady, payload: true})
    })

    this.socket!.on(Events.UserGet, (user: IUser) => {
      const log = getLog('on', Events.UserGet, user)
      console.log(log.key, log.value)

      store.dispatch({type: ActionTypes.SetUser, payload: user})
    })

    this.socket!.on(Events.RoomDefault, (room: IRoom) => {
      const log = getLog('on', Events.RoomDefault, room)
      console.log(log.key, log.value)

      this.getRoomClb(room.drawLines)

      store.dispatch({type: ActionTypes.SetRoom, payload: room})
      this.socket!.emit(Events.RoomJoin, { from: room, to: {id: room.id} })
    })


    this.socket!.on(Events.RoomJoined, (roomJoined: IRoomJoined) => {
      const log = getLog('on', Events.RoomJoined, roomJoined)
      console.log(log.key, log.value)

      store.dispatch({type: ActionTypes.SetRoom, payload: roomJoined.to})
    })

    this.socket!.on(Events.RoomAddDrawLine, (drawLine: Line) => {
      const log = getLog('on', Events.RoomAddDrawLine, drawLine)
      console.log(log.key, log.value)

      this.drawLineClb(drawLine)
      store.dispatch({type: ActionTypes.SetRoomDrawLine, payload: drawLine})
    })

    this.socket!.on(Events.RoomsGet, (rooms: IRoom[]) => {
      rooms.forEach((room: IRoom) => {
        if (room.id === store.getState().app.room.id) {
          store.dispatch({type: ActionTypes.SetRoom, payload: room})
        }
      })

      store.dispatch({type: ActionTypes.SetRooms, payload: { rooms }})
    })
  }

  public emit(event: string, payload: any) {
    const log = getLog('emit', event, payload)
    // console.log(log.key, log.value)

    this.socket!.emit(event, payload)
  }
}

export default new SocketManager()
