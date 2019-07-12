import React, { FunctionComponent, useState } from 'react';
import { RoomI } from '../../../@types';
import useSocketOn from '../../../hooks/useSocketOn';
import { useSelector } from 'react-redux';

const RoomList: FunctionComponent = () => {

  const [rooms, setRooms] = useState<RoomI[]>([]);
  const userId = useSelector<any, any>(state => state.user.id)

  useSocketOn('rooms:get', rooms => {
    console.log('Rooms : Get', rooms);
    setRooms(Array.from(rooms));
  });

  return (
    <ul className="list list--rooms">
      user: {userId}
      { rooms.map((room, index) => {
        return (<li key={index} className={`list__item`}>Room : {room.name} - {room.users.length} users</li>);
      })}
    </ul>
  )
}


export default RoomList;
