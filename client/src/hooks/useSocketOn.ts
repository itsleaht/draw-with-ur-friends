import { useEffect, useContext } from 'react';
import { SocketContext } from './SocketProvider';

const useSocketOn = (event: string, callback?: (...args: any[]) => void): void => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket && event && callback) {
      socket.on(event, callback);
    }
    return () => {
      if (socket && event && callback) {
        socket.removeListener(event, callback)
      }
    };
  }, [event, callback, socket])
}

export default useSocketOn;
