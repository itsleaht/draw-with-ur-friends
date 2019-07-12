import React, {FunctionComponent, useState} from 'react';
import { SocketProvider } from './hooks/SocketProvider';
import { Provider } from 'react-redux';
import { store } from './store';

import Chat from './components/Chat/Chat';
import SVGSprite from './components/UI/icons/SVGSprite';
import Header from './components/Header/Header';
import UserPanel from './components/UserPanel/UserPanel';
import Server from './components/Server/Server';

const App: FunctionComponent = () => {

  const [showDrawComponents, setSsowDrawComponents] = useState<boolean>(false);

  const onUserId = () => {
    setSsowDrawComponents(true);
  }

  return (
    <Provider store={store}>
      <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
        <div className="App">
          <Server onUserId={onUserId} />
          <div className="main">
            <Header />
            {showDrawComponents &&
              <Chat />
            }
          </div>
          {showDrawComponents &&
            <UserPanel />
          }
          <SVGSprite />
        </div>
      </SocketProvider>
    </Provider>
  );
}

export default App;
