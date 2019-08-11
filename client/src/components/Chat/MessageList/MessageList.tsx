import React, { FunctionComponent, useState } from 'react';

import Message from '../Message/Message';

import useSocketOn from '../../../hooks/useSocketOn';

import { IMessage } from '../../../@types';


import './_message-list.styl'
import { Events } from '../../../config/events';

type Props = {
  userId: string
}

const MessageList: FunctionComponent<Props> = ({userId}) => {

  const [messages, setMessages] = useState<IMessage[]>([]);

  const addNewMessage = (newMessage: IMessage) => {
    const messageList: IMessage[] = [...messages, newMessage];
    setMessages(messageList);
  }

  useSocketOn(Events.ChatUserMessage, newMessage => {
    addNewMessage(newMessage);
  });

  useSocketOn(Events.RoomJoined, () => {
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
