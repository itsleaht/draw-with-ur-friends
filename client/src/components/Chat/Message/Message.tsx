import React, { FunctionComponent } from 'react'

import { IMessage } from '../../../@types'

import './_message.styl'

type Props = {
  message: IMessage,
  isMine: boolean,
  userId: string
}

const Message: FunctionComponent<Props>  = ({ message, isMine }) => {
  const dateTimeCreation = new Date(message.createdAt)
  const time = `${dateTimeCreation.getHours()}:${dateTimeCreation.getMinutes()}`

  return (
    <div className={`message ${isMine ? 'is-mine' : ''}`}>
      <div className="message__body">
        <p>{message.content}</p>
      </div>
      <span className="message__bottom">{message.from.name} at {time}</span>
    </div>
  )
}

export default Message
