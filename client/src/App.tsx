import React, { FunctionComponent, useState, useEffect } from 'react';

import { SocketProvider } from './hooks/SocketProvider';
import { Provider } from 'react-redux';
import { store } from './store';

import Chat from './components/Chat/Chat';
import SVGSprite from './components/UI/icons/SVGSprite';
import Header from './components/Header/Header';
import RoomPanel from './components/RoomPanel/RoomPanel';
import DrawCanvas from './components/DrawCanvas/DrawCanvas';

const App: FunctionComponent = () => {

  const [showDrawComponents, setShowDrawComponents] = useState<boolean>(false);

  const onStoreUpdate = () => {
    const state = store.getState().app;
    console.log('App : On Store Update', state);
    if (state.user.id.length > 0 && state.room.id.length > 0 && !showDrawComponents) {
      console.log('App : Show Draw components');
      setShowDrawComponents(true);
    }
  }

  useEffect(() => {
    const unsubscribe = store.subscribe(onStoreUpdate)
    return () => {
      unsubscribe()
    };
  }, [store, showDrawComponents]);


  return (
    <Provider store={store}>
      <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
        <div className="App">
            <Header />
            <DrawCanvas />
          <div className="aside">
            {showDrawComponents &&
              <RoomPanel />
            }
            {showDrawComponents &&
              <Chat />
            }
          </div>
          <SVGSprite />
        </div>
      </SocketProvider>
    </Provider>
  );
}

export default App;
