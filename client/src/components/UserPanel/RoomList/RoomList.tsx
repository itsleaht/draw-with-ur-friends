import React, { FunctionComponent, useState } from 'react';
import { RoomI } from '../../../@types';
import useSocketOn from '../../../hooks/useSocketOn';

const RoomList: FunctionComponent = () => {

  const [rooms, setRooms] = useState<RoomI[]>([]);

  useSocketOn('rooms:get', rooms => {
    console.log('get rooms', rooms);
    setRooms(Array.from(rooms));
  });

  return (
    <ul className="list list--rooms">
      { rooms.map((room, index) => {
        return (<li key={index} className={`list__item`}>Room : {room.name} {room.users.length}</li>);
      })}
    </ul>
  )
}

export default RoomList;
