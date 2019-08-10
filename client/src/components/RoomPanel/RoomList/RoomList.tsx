import React, { FunctionComponent } from 'react';
import { RoomI, UserI } from '../../../@types';

import './_list-rooms.styl';

type Props = {
  users: UserI[],
  userId: string,
  rooms: RoomI[],
  roomId: string,
  onClickRoomClb: (id: string) => void
}

const RoomList: FunctionComponent<Props> = ({rooms, roomId, onClickRoomClb}) => {

  return (
    <ul className="list list--rooms">
      { rooms.map((room, index) => {
        return (<li key={index} className={`list__item ${roomId === room.id ? 'is-active' : ''}`} onClick={() => onClickRoomClb(room.id)}>{room.name} {room.users.length}</li>);
      })}
    </ul>
  )
}


export default RoomList;
