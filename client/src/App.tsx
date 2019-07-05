import React, {FunctionComponent} from 'react';
import { SocketProvider } from './hooks/SocketProvider';

const App: FunctionComponent = () => {
  return (
    <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
      <div className="App">
      </div>
    </SocketProvider>
  );
}

export default App;
