import React, { FunctionComponent, useState, useEffect } from "react";

import useSocketOn from "../../hooks/useSocketOn";
import useSocket from "../../hooks/useSocket";

import { useDispatch } from "react-redux";
import { SET_USER, SET_ROOM } from "../../store/actionTypes";
import { Function } from "@babel/types";

type User = {
  id: ''
}

type Room = {
  id: ''
}

type Props = {
  onUserId: {(): void}
}

const Server: FunctionComponent<Props> = ({onUserId}) => {
  const [user, setUser] = useState<User>({id: ''});
  const [room, setRoom] = useState<Room>({id: ''});

  const socket = useSocket();
  const dispatch = useDispatch();

  useSocketOn('user:info', userInfo => {
    setUser(userInfo);

    if (userInfo && userInfo.id.length > 0) {
      onUserId();
    }
  });

  useSocketOn('room:default', roomId => {
    setRoom({id: roomId});
    socket!.emit('room:join', { from: {id: roomId}, to: {id: roomId} });
  });

  useSocketOn('room:join', room => {
    if (user.id) {
      setRoom({id: room.to.id});
    }
  });

  useEffect(() => {
    dispatch({type: SET_USER, payload: user});
  }, [user])

  useEffect(() => {
    dispatch({type: SET_ROOM, payload: room});
  }, [room])

  return (
    <>
    </>
  );
}

export default Server;
