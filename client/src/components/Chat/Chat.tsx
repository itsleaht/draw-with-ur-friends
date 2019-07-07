import React, { FunctionComponent, useState, useEffect } from "react";
import MessageList from "./MessageList/MessageList";
import MessageForm from "./MessageForm/MessageForm";

import useSocketOn from "../../hooks/useSocketOn";

import './_chat.styl';
import Icon from "../UI/icons/Icon";

type User = {
  id: ''
}

const Chat: FunctionComponent = () => {
  const [user, setUser] = useState<User>({id: ''});

  useSocketOn('user:info', userInfo => {
    setUser(userInfo)
  });

  return (
    <div className="chat">
      <div className="chat__inner">
        <div className="chat__header">
          <div className="chat__header__left">
            <Icon name="message-notification" fill="#4A5CFF" width={40} height={27}  />
            <span className="heading-3">The artist team</span>
          </div>
          <div className="chat__header__right">
            <button className="chat__toggle">
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
