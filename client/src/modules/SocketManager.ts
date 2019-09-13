import { Events } from "../config/events"

import { addLog, getLog } from "../helpers/utils"

import { store } from './../store'
import { ActionTypes } from '../store/actionTypes'

import { IUser, IRoomJoined, IRoom, Line, IMessage } from '../@types'

interface ISocketManager {
  socket: SocketIOClient.Socket
}

class SocketManager {
  private socket: SocketIOClient.Socket | null = null
  private drawLineClb: Function = () => {}
  private changeRoomClb: Function = () => {}

  constructor () {
  }

  public setSocket (params: ISocketManager) {
    this.socket = params.socket
    this.init()
  }

  public setClbs (params: {drawLineClb?: Function, changeRoomClb?: Function}) {
    if (params.drawLineClb)
      this.drawLineClb = params.drawLineClb

    if (params.changeRoomClb)
    this.changeRoomClb = params.changeRoomClb
  }

  private init() {
    addLog('on', 'SocketManager:init')

    this.listen()
  }

  private listen () {

    this.socket!.on(Events.ServerGetIsReady, (isReady: {isReady: boolean}) => {
      store.dispatch({type: ActionTypes.SetIsServerReady, payload: true})
    })

    this.socket!.on(Events.UserGet, (user: IUser) => {
      store.dispatch({type: ActionTypes.SetUser, payload: user})
    })

    this.socket!.on(Events.RoomDefault, (room: IRoom) => {
      store.dispatch({type: ActionTypes.SetRoom, payload: room})
      this.socket!.emit(Events.RoomJoin, { from: room, to: {id: room.id} })
    })


    this.socket!.on(Events.RoomJoined, (roomJoined: IRoomJoined) => {
      this.changeRoomClb(roomJoined.to.drawLines)
      store.dispatch({type: ActionTypes.SetRoom, payload: roomJoined.to})
    })

    this.socket!.on(Events.RoomAddDrawLine, (drawLine: Line) => {
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

    this.socket!.on(Events.RoomGetNewMessage, (message: IMessage) => {
      store.dispatch({type: ActionTypes.SetRoomMessage, payload: { message: message }})
    })
  }

  public emit(event: string, payload: any) {
    const log = getLog('emit', event, payload)
    // console.log(log.key, log.value)

    this.socket!.emit(event, payload)
  }
}

export default new SocketManager()
