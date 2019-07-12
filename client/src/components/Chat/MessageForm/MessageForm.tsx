import React, { FunctionComponent, useState, createRef } from "react";
import useSocket from "../../../hooks/useSocket";

import './_message-form.styl';
import { useSelector } from "react-redux";

type Props = {
  userId: string
}

const MessageForm: FunctionComponent<Props>  = ({userId}) => {
  const [content, setContent] = useState<string>('');
  const roomId = useSelector<any, any>(state => state.room.id);
  const socket = useSocket();

  const formMessage = createRef<HTMLFormElement>();

  const onFormSubmit = () => {
    console.log(roomId)
    if (content.length > 0) {
      socket!.emit('chat:message', { content, userId, roomId });
    }
    setContent('');
  }

  const onTextareaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.keyCode || e.which) === 13) {
      e.preventDefault();
      if (formMessage && formMessage.current) {
        onFormSubmit();
      }
      return false;
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    setContent(message);
  }

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onFormSubmit();
  }

  return (
    <form className="form form--message" onSubmit={onFormSubmit} ref={formMessage}>
      <div className="form__wrapper">
        <textarea onChange={onInputChange} className="form__textarea" value={content} onKeyPress={onTextareaKeyPress}></textarea>
      </div>
      <button type="submit" className="form__submit" onClick={onClickButton}>Send</button>
    </form>
  );
}

export default MessageForm;
