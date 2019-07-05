import React, {FunctionComponent} from 'react';
import { SocketProvider } from './hooks/SocketProvider';
import Chat from './components/Chat/Chat';

const App: FunctionComponent = () => {
  return (
    <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
      <div className="App">
        <Chat />
      </div>
    </SocketProvider>
  );
}

export default App;
