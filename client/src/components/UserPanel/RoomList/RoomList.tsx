import React, { FunctionComponent } from 'react';
import { RoomI } from '../../../@types';

import './_list-rooms.styl';
import Icon from '../../UI/icons/Icon';

type Props = {
  rooms: RoomI[],
  roomId: string,
  onClickRoomClb: (id: string) => void
}

const RoomList: FunctionComponent<Props> = ({rooms, roomId, onClickRoomClb}) => {

  return (
    <ul className="list list--rooms">
      { rooms.map((room, index) => {
        return (<li key={index} className={`list__item ${roomId === room.id ? 'is-active' : ''}`} onClick={() => onClickRoomClb(room.id)}>{room.name}
        <Icon name="user" width={11} height={10} fill="#3514FF"/>{room.users.length}</li>);
      })}
    </ul>
  )
}


export default RoomList;
