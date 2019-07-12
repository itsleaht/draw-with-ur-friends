import React, {FunctionComponent} from 'react';
import { SocketProvider } from './hooks/SocketProvider';
import { Provider } from 'react-redux';
import { store } from './store';

import Chat from './components/Chat/Chat';
import SVGSprite from './components/UI/icons/SVGSprite';
import Header from './components/Header/Header';
import UserPanel from './components/UserPanel/UserPanel';

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
        <div className="App">
          <div className="main">
            <Header />
            <Chat />
          </div>
          <UserPanel />
          <SVGSprite />
        </div>
      </SocketProvider>
    </Provider>
  );
}

export default App;
