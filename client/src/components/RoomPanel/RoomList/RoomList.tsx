import React, { FunctionComponent } from 'react';
import { RoomI, UserI } from '../../../@types';

import './_list-rooms.styl';
import RoomCard from '../RoomCard/RoomCard';

type Props = {
  userId: string,
  rooms: RoomI[],
  roomId: string,
  onClickRoomClb: (id: string) => void
}

const RoomList: FunctionComponent<Props> = ({userId, rooms, roomId, onClickRoomClb}) => {

  return (
    <ul className="list list--rooms">
      { rooms.map((room, index) => {
        const isActive = room.id === roomId
        return (
          <li key={index} className={`list__item`}>
            <RoomCard room={room} isActive={isActive} onClickClb={() =>  onClickRoomClb(room.id)} userId={isActive ? userId : ''} />
          </li>
          );
      })}
    </ul>
  )
}


export default RoomList;
