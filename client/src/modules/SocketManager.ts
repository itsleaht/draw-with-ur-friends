import { Events } from "../config/events";

import { addLog, getLog } from "../helpers/utils";

import { store } from './../store';
import { ActionTypes } from '../store/actionTypes';

import { IUser, IRoomJoined, IRoom } from '../@types';

interface ISocketManager {
  socket: SocketIOClient.Socket;
}

class SocketManager {
  private socket: SocketIOClient.Socket;

  constructor (params: ISocketManager) {
    this.socket = params.socket;
    this.init();
  }

  private init() {
    addLog('on', 'SocketManager:init');

    this.listen()
  }

  private listen () {
    this.socket.on(Events.UserGet, (user: IUser) => {
      const log = getLog('on', Events.UserGet, user);
      console.log(log.key, log.value);

      store.dispatch({type: ActionTypes.SetUser, payload: user});
    });

    this.socket.on(Events.RoomDefault, (room: IRoom) => {
      const log = getLog('on', Events.RoomDefault, room);
      console.log(log.key, log.value);

      store.dispatch({type: ActionTypes.SetRoom, payload: room});
      this.socket.emit(Events.RoomJoin, { from: room, to: {id: room.id} });
    })

    this.socket.on(Events.RoomJoined, (roomJoined: IRoomJoined) => {
      const log = getLog('on', Events.RoomJoined, roomJoined);
      console.log(log.key, log.value);

      store.dispatch({type: ActionTypes.SetRoom, payload: roomJoined.to});
    });

    this.socket.on(Events.RoomsGet, (rooms: IRoom[]) => {
      const log = getLog('on', Events.RoomsGet, rooms);
      console.log(log.key, log.value);

      rooms.forEach( (room: IRoom) => {
        if (room.id === store.getState().app.room.id) {
          store.dispatch({type: ActionTypes.SetRoom, payload: room});
        }
      })

      store.dispatch({type: ActionTypes.SetRooms, payload: {rooms}});
    })
  }
}

export default SocketManager;
