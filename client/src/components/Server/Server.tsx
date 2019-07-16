import React, { FunctionComponent, useState, useEffect } from "react";

import useSocketOn from "../../hooks/useSocketOn";
import useSocket from "../../hooks/useSocket";

import { useDispatch } from "react-redux";
import { SET_USER, SET_ROOM } from "../../store/actionTypes";
import { addLog } from "../../helpers/utils";
type User = {
  id: ''
}

type Room = {
  id: '',
  name: ''
}

type Props = {
  onUserId: {(): void}
}

const Server: FunctionComponent<Props> = ({onUserId}) => {
  const [user, setUser] = useState<User>({id: ''});
  const [room, setRoom] = useState<Room>({id: '', name: ''});

  const socket = useSocket();
  const dispatch = useDispatch();

  useSocketOn('user:info', userInfo => {
    addLog('on', 'Server:user:info',userInfo);
    setUser(userInfo);

    if (userInfo && userInfo.id.length > 0) {
      onUserId();
    }
  });

  useSocketOn('room:default', room => {
    addLog('on', 'Server:room:default',room);
    setRoom({ id: room.id, name: room.name });
    socket!.emit('room:join', { from: room, to: {id: room.id} });
  });

  useSocketOn('room:joined', event => {
    addLog('on', 'Server:room:joined', event);

    if (user.id) {
      addLog('func', 'Server:set:room', event.to.id);
      setRoom({id: event.to.id, name: event.to.name});
    }
  });

  useEffect(() => {
    dispatch({type: SET_USER, payload: user});
  }, [user])

  useEffect(() => {
    addLog('func', 'Server:use:Effect', room);
    dispatch({type: SET_ROOM, payload: room});
  }, [room])

  return (
    <>
    </>
  );
}

export default Server;
