import React, { useEffect, useState, FunctionComponent } from 'react'

import Header from '../../components/Header/Header'

import './_about.styl'

type Props = {}

const About: FunctionComponent<Props> = () => {
  return (
    <div className="page page--about">
      <Header isFull={false} />
      <div className="page__inner">
        <div className="page__top">
        </div>
        <div className="page__body">
          <div className={`box box--about`}>
            <div className="box__inner">
              <div className="box__top">
                <span className="tag box__type">DWUF | About</span>
              </div>
              <div className="box__body">
                <div className="box__block box__block--quote">
                  <h2 className="box__title heading-1">" Nice, fun, jeune et friendly "</h2>
                  <span className="teasing-1 box__author"><a href="http://mathildegarde.fr/" className="link link--secondary" target="_blank" rel="noopener noreferrer">Mathilde Garde</a>, designer</span>
                </div>
                <div className="box__block">
                  <h2 className="box__title heading-2">Genesis</h2>
                  <p className="box__text teasing-1"><span className="highlight">Draw with your friends</span> is a personal project. It is inspired by <a href="https://medium.com/better-programming/building-a-realtime-drawing-app-using-socket-io-and-p5-js-86f979285b12" className="link link--primary" target="_blank" rel="noopener noreferrer">this article</a> written by Gabriel Tanner.</p>
                </div>
                <div className="box__block">
                  <h2 className="box__title heading-2">Purpose</h2>
                  <p className="box__text teasing-1">The main goal is to invite friends over a room (artboard) and have fun drawing on a blank canvas with them. Each room is also provided with a chat to discuss drawing topics.</p>
                </div>
                <div className="box__block">
                  <h2 className="box__title heading-2">Links</h2>
                  <ul className="list--links">
                    <li className="list__item"><a href="https://github.com/itsleaht/draw-with-ur-friends" className="link link--primary" target="_blank" rel="noopener noreferrer">Github Project</a></li>
                    <li className="list__item"><a href="/assets/ui_styleguide.svg" className="link link--primary" target="_blank" rel="noopener noreferrer">UI Styleguide</a></li>
                  </ul>
                </div>
                <div className="box__block">
                  <h2 className="box__title heading-2">Tech</h2>
                  <p className="box__text teasing-1">This project is powered by React, P5, Socket.IO and Typescript.</p>
                  <p className="box__text teasing-1">The app is hosted on Netlify and the server is hosted on Heroku.</p>
                </div>
              </div>
              <div className="box__bottom">
                <a href="https://twitter.com/itsleaht" className="link link--primary" target="_blank" rel="noopener noreferrer">@itsleaht</a>
              </div>
            </div>
              {/* <h1 className="box__title heading-1"># About this app</h1> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
