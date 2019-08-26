import React, { FunctionComponent } from 'react'

import Icon from './../../UI/icons/Icon'

import './_chat-notification.styl'

type Props = {
  maxCounter: number,
  counter: number
}

const ChatNotification: FunctionComponent<Props> = ({maxCounter, counter}) => {
  return (
    <div className="chat__notification">
      <Icon extraClasses="chat__notification__icon" name="message-notification" fill="#4A5CFF" width={40} height={27}  />
      <span className="chat__notification__text">{counter}{counter >=  maxCounter ? '+' : ''}</span>
    </div>
  )
}

export default ChatNotification
