import React, { FunctionComponent } from 'react'

import { SocketProvider } from './hooks/SocketProvider'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Draw from './pages/Draw/Draw'
import Login from './pages/Login/Login'
import About from './pages/About/About'
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
          </div>
        </Router>
        <SVGSprite />
      </SocketProvider>
    </Provider>
  )
}

export default App
