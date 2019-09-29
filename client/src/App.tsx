import React, { FunctionComponent } from 'react'

import { SocketProvider } from './hooks/SocketProvider'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Draw from './pages/DrawPage/Draw'
import Login from './pages/LoginPage/Login'
import About from './pages/AboutPage/About'
import SVGSprite from './components/UI/icons/SVGSprite'

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <SocketProvider url={process.env.REACT_APP_SOCKET_API_URL ? process.env.REACT_APP_SOCKET_API_URL : ''}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login}/>
            <Route exact path="/draw" component={Draw}/>
            <Route exact path="/about" component={About}/>
            <div className="warning">
              <span>⚠️</span> Warning, these website isn't optimized for your screen size. Please come back on your desktop to fully enjoy the experience. <span>⚠️</span>
            </div>
          </div>
        </Router>
        <SVGSprite />
      </SocketProvider>
    </Provider>
  )
}

export default App
