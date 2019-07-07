import React, { FunctionComponent, useState, useEffect } from "react";
import MessageList from "./MessageList/MessageList";
import MessageForm from "./MessageForm/MessageForm";

import useSocketOn from "../../hooks/useSocketOn";

import Icon from '../UI/icons/Icon';

import './_chat.styl';

type User = {
  id: ''
}

const Chat: FunctionComponent = () => {
  const [user, setUser] = useState<User>({id: ''});
  const [isMinified, setisMinified] = useState<boolean>(true);

  const onClickToggle = () => {
    setisMinified(!isMinified);
  }

  useSocketOn('user:info', userInfo => {
    setUser(userInfo)
  });

  return (
    <div className={`chat ${isMinified ? 'is-minified' : ''}`}>
      <div className="chat__inner">
        <div className="chat__header">
          <div className="chat__header__left">
            <div className="chat__notification">
              <Icon extraClasses="chat__notification__icon" name="message-notification" fill="#4A5CFF" width={40} height={27}  />
              <span className="chat__notification__text"></span>
            </div>
            <span className="heading-3 chat__title">The artist team</span>
          </div>
          <div className="chat__header__right">
            <button className="chat__toggle" onClick={onClickToggle}>
              <Icon name="arrow-down" fill="#000" width={15} height={6}  />
            </button>
          </div>
        </div>
        <div className="chat__body">
          <div className="chat__body__top">
            <MessageList userId={user.id} />
          </div>
          <div className="chat__body__bottom">
            <MessageForm userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
