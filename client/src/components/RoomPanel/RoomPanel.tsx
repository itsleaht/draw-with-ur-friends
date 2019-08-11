import React, { FunctionComponent, useState } from 'react';
import RoomList from './RoomList/RoomList';
import Btn from '../UI/buttons/Btn';

import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import useSocketOn from '../../hooks/useSocketOn';
import { Events } from '../../config/events';

import { IUser, IRoom, IRoomJoin } from '../../@types';
import { State, Room, User } from '../../store/types';

import { addLog } from '../../helpers/utils';

import './_room-panel.styl';

const RoomPanel: FunctionComponent = () => {
  const socket = useSocket();
  const room = useSelector<State, Room>(state => state.app.room)
  const user = useSelector<State, User>(state => state.app.user)

  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const onClickCreateRoom = () => {
    joinRoom({id: '', name: 'test name'});
  }

  const joinRoom = (to: IRoomJoin) => {
    socket!.emit(Events.RoomJoin, {
      from: {id: room.id},
      to: to
    });
  }

  const onClickRoomClb = (roomId: string) => {
    if (roomId !== room.id) {
      joinRoom({id: roomId});
    }
  }

  useSocketOn(Events.RoomsGet, rooms => {
    addLog('on', Events.RoomsGet, rooms);
    setRooms(Array.from(rooms));
  });

  useSocketOn(Events.UsersGet, users => {
    addLog('on', Events.UsersGet, users);
    setUsers(Array.from(users));
  });

  return (
    <div className="panel panel--room">
      <div className="panel__inner">
        <div className="panel__top">
          <h1 className="panel__title heading-1">Artboards ( {rooms.length} )</h1>
          <Btn className="btn btn--primary" icon={{name: 'plus', width: 12, height: 12, fill: '#fff', stroke: '#fff'}}  onClickClb={onClickCreateRoom}/>
        </div>
        <div className="panel__body">
          <RoomList userId={user.id}rooms={rooms} roomId={room.id} onClickRoomClb={onClickRoomClb} />
        </div>
      </div>
    </div>
  );
}

export default RoomPanel;
