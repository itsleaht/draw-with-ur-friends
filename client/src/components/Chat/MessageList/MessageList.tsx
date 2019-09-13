import React, { FunctionComponent, useState, useRef, useEffect } from 'react'

import Message from '../Message/Message'

import useSocketOn from '../../../hooks/useSocketOn'

import { IMessage } from '../../../@types'
import { Events } from '../../../config/events'

import './_message-list.styl'

type Props = {
  userId: string
}

const MessageList: FunctionComponent<Props> = ({userId}) => {

  const [messages, setMessages] = useState<IMessage[]>([])
  const messageListRef = useRef<HTMLUListElement>(null)

  //todo : retrieve room messages when changing room

  const addNewMessage = (newMessage: IMessage) => {
    const messageList: IMessage[] = [...messages, newMessage]
    setMessages(messageList)
  }

  useSocketOn(Events.ChatUserMessage, newMessage => {
    addNewMessage(newMessage)

  })

  useSocketOn(Events.RoomJoined, () => {
    setMessages([])
  })

  useEffect(() => {
    if (messageListRef.current) {
      const height = messageListRef.current.scrollHeight
      console.log(height)
      messageListRef.current.scrollTo(0, height)
    }
  }, [messages])

  return (
    <ul className="list list--message" ref={messageListRef}>
      { messages.map((message, index) => {
        const isMine = message.from && message.from.id ? message.from.id === userId : false
        return (<li key={index} className={`list__item ${isMine ? 'is-mine' : ''}`}><Message message={message} isMine={message.from.id === userId} userId={userId} /></li>)
      })}
    </ul>
  )
}

export default MessageList
