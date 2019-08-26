import React, { FunctionComponent } from 'react'
import ToolboxPanel from '../ToolboxPanel/ToolboxPanel'

import './_header.styl'

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a className="header__logo" href="/">
            <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} className="header__logo__image" alt="logo" />
          </a>
        </div>
        <div className="header__middle">
          <ToolboxPanel />
        </div>
        <div className="header__right"></div>
      </div>
    </header>
  )
}

export default Header
