import { Events } from "../config/events";

import { addLog } from "../helpers/utils";
import { UserI, RoomJoinedI, RoomI } from "../@types";

import { store } from './../store';
import { SET_USER, SET_ROOM } from "../store/actionTypes";

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

    this.socket.on(Events.UserGet, (user: UserI) => {
      addLog('on', Events.UserGet, user);
      store.dispatch({type: SET_USER, payload: user})
    });

    this.socket.on(Events.RoomDefault, (room: RoomI) => {
      addLog('on', Events.RoomDefault, room);
      store.dispatch({type: SET_ROOM, payload: room});
      this.socket.emit(Events.RoomJoin, { from: room, to: {id: room.id} });
    })

    this.socket.on(Events.RoomJoined, (roomJoined: RoomJoinedI) => {
      addLog('on', Events.RoomJoined, roomJoined);
      store.dispatch({type: SET_ROOM, payload: roomJoined.to});
    });
  }
}

export default SocketManager;
