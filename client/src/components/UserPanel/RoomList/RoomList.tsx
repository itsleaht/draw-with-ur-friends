import React, { FunctionComponent } from 'react';
import Icon from '../../UI/icons/Icon';

import { IRoom } from '../../../@types';

import './_list-rooms.styl';

type Props = {
  rooms: IRoom[],
  roomId: string,
  onClickRoomClb: (id: string) => void
}

const RoomList: FunctionComponent<Props> = ({rooms, roomId, onClickRoomClb}) => {

  return (
    <ul className="list list--rooms">
      { rooms.map((room, index) => {
        return (<li key={index} className={`list__item ${roomId === room.id ? 'is-active' : ''}`} onClick={() => onClickRoomClb(room.id)}>{room.name}
        <Icon name="user" width={11} height={10} fill="#3514FF"/>{room && room.users ? room.users.length : '0'}</li>);
      })}
    </ul>
  )
}


export default RoomList;
