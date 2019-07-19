import React, { FunctionComponent, useState } from 'react';

import Message from '../Message/Message';

import useSocketOn from '../../../hooks/useSocketOn';

import { MessageI } from '../../../@types';


import './_message-list.styl'

type Props = {
  userId: string
}

const MessageList: FunctionComponent<Props> = ({userId}) => {

  const [messages, setMessages] = useState<MessageI[]>([]);

  const addNewMessage = (newMessage: MessageI) => {
    const messageList: MessageI[] = [...messages, newMessage];
    setMessages(messageList);
  }

  useSocketOn('chat:message', newMessage => {
    addNewMessage(newMessage);
  });

  useSocketOn('room:joined', () => {
    setMessages([]);
  });

  return (
    <ul className="list list--message">
      { messages.map((message, index) => {
        const isMine = message.from && message.from.id ? message.from.id === userId : false;
        return (<li key={index} className={`list__item ${isMine ? 'is-mine' : ''}`}><Message message={message} isMine={message.from.id == userId} userId={userId} /></li>);
      })}
    </ul>
  )
}

export default MessageList;
