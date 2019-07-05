import React, {FunctionComponent} from 'react';
import { SocketProvider } from './hooks/SocketProvider';

import Chat from './components/Chat/Chat';
import SVGSprite from './components/UI/icons/SVGSprite';

const App: FunctionComponent = () => {
  return (
    <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
      <div className="App">
        <SVGSprite />
        <Chat />
      </div>
    </SocketProvider>
  );
}

export default App;
