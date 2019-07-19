import { useContext } from 'react';
import { SocketContext } from './SocketProvider';

const useSocket = (): SocketIOClient.Socket | null => useContext(SocketContext);

export default useSocket;
