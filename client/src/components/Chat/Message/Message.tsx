import React, { FunctionComponent } from "react";
import { MessageI } from '../../../@types';

import './_message.styl';

type Props = {
  message: MessageI,
  isMine: boolean,
  userId: string
}

const Message: FunctionComponent<Props>  = ({message, isMine, userId}) => {
  const dateTimeCreation = new Date(message.createdAt);
  const time = `${dateTimeCreation.getHours()}:${dateTimeCreation.getMinutes()}`;

  console.log(message);

  return (
    <div className={`message ${isMine ? 'is-mine' : ''}`}>
      <div className="message__body">
        <p>{message.content}- {message.roomId}</p>
      </div>
      <span className="message__bottom">{message.from.name} at {time}</span>
    </div>
  );
}

export default Message;
