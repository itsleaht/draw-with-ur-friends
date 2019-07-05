import { FunctionComponent, createContext, createElement, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Props {
  url: string;
}

export const SocketContext = createContext<SocketIOClient.Socket | null>(null);

export const SocketProvider: FunctionComponent<Props> = (props) => {
  const {url, children} = props;
  const [socket, setSocket]  = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    setSocket(io.connect(url));

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [url])

  return createElement(
    SocketContext.Provider,
    { value: socket },
    children);
}
