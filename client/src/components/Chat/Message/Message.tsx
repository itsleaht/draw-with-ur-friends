import React, { FunctionComponent } from "react";
import { MessageI } from '../../../@types';

type Props = {
  message: MessageI,
  isMine: boolean,
  userId: string
}

const Message: FunctionComponent<Props>  = ({message, isMine, userId}) => {
  const dateTimeCreation = new Date(message.createdAt);
  const time = `${dateTimeCreation.getHours()}:${dateTimeCreation.getMinutes()}`;

  return (
    <div className={`message ${isMine ? 'is-mine' : ''}`}>
      <div className="message__body">
        <p>{message.content}</p>
      </div>
      <span className="message__bottom">{message.from.name} at {time}</span>
    </div>
  );
}

export default Message;