import React, { FunctionComponent } from 'react';
import RoomList from './RoomList/RoomList';

import './_user-panel.styl';
import useSocket from '../../hooks/useSocket';
import { useSelector } from 'react-redux';
import useSocketOn from '../../hooks/useSocketOn';

const UserPanel: FunctionComponent = () => {
  const socket = useSocket();
  const roomId = useSelector<any, any>(state => state.room.id)

  const onClickCreateRoom = () => {
    socket!.emit('room:join', {
      from: {id: roomId},
      to: { name: 'A new room test' }
    });
  }

  return (
    <div className="panel panel--user">
      <div className="panel panel__inner">
        <h1>Liste des rooms</h1>
        room: {roomId}
        <RoomList />

        <button className="btn btn--primary" onClick={onClickCreateRoom}>Create Room</button>
      </div>
    </div>
  );
}

export default UserPanel;
