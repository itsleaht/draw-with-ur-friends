import React, { FunctionComponent, useState, useEffect } from 'react';

import { SocketProvider } from './hooks/SocketProvider';
import { Provider } from 'react-redux';
import { store } from './store';

import Chat from './components/Chat/Chat';
import SVGSprite from './components/UI/icons/SVGSprite';
import Header from './components/Header/Header';
import RoomPanel from './components/RoomPanel/RoomPanel';
import DrawCanvas from './components/DrawCanvas/DrawCanvas';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App: FunctionComponent = () => {

  const [showDrawComponents, setShowDrawComponents] = useState<boolean>(false);
@types/react-router-dom
  const onStoreUpdate = () => {
    const state = store.getState().app;
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
        <Router>

        </Router>
        <div className="App">
            <Header />
            <main className="main">
              <DrawCanvas />
            </main>
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
