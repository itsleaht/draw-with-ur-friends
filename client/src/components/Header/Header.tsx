import React, { FunctionComponent, useState, useEffect } from "react";
import logo from './logo.svg';

import './_header.styl';

const Header: FunctionComponent = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} className="header__logo" alt="logo" />
        </div>
        <div className="header__middle"></div>
        <div className="header__right"></div>
      </div>
    </header>
  );
}

export default Header;
