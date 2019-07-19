import React, { FunctionComponent, useState } from 'react';
import RoomList from './RoomList/RoomList';
import UserList from './UserList/UserList';
import Btn from '../UI/buttons/Btn';
import Icon from '../UI/icons/Icon';

import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';
import useSocketOn from '../../hooks/useSocketOn';


import { addLog } from '../../helpers/utils';

import { IUser, IRoom, IRoomJoin } from '../../@types';
import { State, Room, User } from '../../store/types';

import './_user-panel.styl';
import { Events } from '../../config/events';

const UserPanel: FunctionComponent = () => {
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
    <div className="panel panel--user">
      <div className="panel__inner">
        <div className="panel__box panel__box--users">
          <div className="panel__box__top">
            <h1 className="panel__title heading-1">{room.name}</h1>
            <span>
              <Icon name="user" width={20} height={19} fill="#3514FF"/>
              <span>{users.length}</span>
            </span>

          </div>
          <UserList users={users} userId={user.id} />
        </div>

        <div className="panel__box panel__box--rooms">
          <div className="panel__box__top">
            <h1 className="panel__title heading-1">Rooms</h1>
            <Btn className="btn btn--primary" icon={{name: 'plus', width: 10, height: 10, fill: '#fff'}}  onClickClb={onClickCreateRoom}/>
          </div>
          <RoomList rooms={rooms} roomId={room.id} onClickRoomClb={onClickRoomClb} />
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
