import React, { FunctionComponent, useState } from 'react';

import useSocket from '../../hooks/useSocket';
import { useSelector } from 'react-redux';
import useSocketOn from '../../hooks/useSocketOn';

import { UserI, RoomI } from '../../@types';

import { addLog } from '../../helpers/utils';

import RoomList from './RoomList/RoomList';

import './_room-panel.styl';
import Btn from '../UI/buttons/Btn';
import Icon from '../UI/icons/Icon';

const RoomPanel: FunctionComponent = () => {
  const socket = useSocket();
  const room = useSelector<any, any>(state => state.room)
  const user = useSelector<any, any>(state => state.user)

  const [rooms, setRooms] = useState<RoomI[]>([]);
  const [users, setUsers] = useState<UserI[]>([]);

  const onClickCreateRoom = () => {
    joinRoom({id: '', name: 'test name'});
  }

  const joinRoom = (to: {id?: string, name?: string}) => {
    socket!.emit('room:join', {
      from: {id: room.id},
      to: to
    });
  }

  const onClickRoomClb = (roomId: string) => {
    if (roomId !== room.id) {
      joinRoom({id: roomId});
    }
  }

  useSocketOn('rooms:get', rooms => {
    addLog('on', 'rooms:get', rooms);
    setRooms(Array.from(rooms));
  });

  useSocketOn('users:get', users => {
    addLog('on', 'users:get', users);
    setUsers(Array.from(users));
  });

  return (
    <div className="panel panel--room">
      <div className="panel__inner">
        <div className="panel__top">
          <h1 className="panel__title heading-1">Boards ( {rooms.length} )</h1>
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
