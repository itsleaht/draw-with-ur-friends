import { Events } from "../config/events";

import { addLog } from "../helpers/utils";

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

    this.socket.on(Events.UserGet, (user: IUser) => {
      addLog('on', Events.UserGet, user);
      store.dispatch({type: ActionTypes.SetUser, payload: user})
    });

    this.socket.on(Events.RoomDefault, (room: IRoom) => {
      addLog('on', Events.RoomDefault, room);
      store.dispatch({type: ActionTypes.SetRoom, payload: room});
      this.socket.emit(Events.RoomJoin, { from: room, to: {id: room.id} });
    })

    this.socket.on(Events.RoomJoined, (roomJoined: IRoomJoined) => {
      addLog('on', Events.RoomJoined, roomJoined);
      store.dispatch({type: ActionTypes.SetRoom, payload: roomJoined.to});
    });
  }
}

export default SocketManager;
