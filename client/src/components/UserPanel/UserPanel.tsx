import React, { FunctionComponent, useState } from 'react';

import useSocket from '../../hooks/useSocket';
import { useSelector } from 'react-redux';
import useSocketOn from '../../hooks/useSocketOn';

import { UserI, RoomI } from '../../@types';

import { addLog } from '../../helpers/utils';

import RoomList from './RoomList/RoomList';
import UserList from './UserList/UserList';

import './_user-panel.styl';
import Btn from '../UI/buttons/Btn';
import Icon from '../UI/icons/Icon';

const UserPanel: FunctionComponent = () => {
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
    <div className="panel panel--user">
      <div className="panel__inner">
        <div className="panel__box panel__box--users">
          <div className="panel__box__top">
            <h1 className="panel__title heading-1">{room.name} ( {users.length} )</h1>
            {/* <span>
              <Icon name="user" width={20} height={19} fill="#3514FF"/>
              <span></span>
            </span> */}

          </div>
          <UserList users={users} userId={user.id} />
        </div>

        <div className="panel__box panel__box--rooms">
          <div className="panel__box__top">
            <h1 className="panel__title heading-1">Rooms ( {rooms.length} )</h1>
            <Btn className="btn btn--primary" icon={{name: 'plus', width: 10, height: 10, fill: '#fff'}}  onClickClb={onClickCreateRoom}/>
          </div>
          <RoomList rooms={rooms} roomId={room.id} onClickRoomClb={onClickRoomClb} />
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
