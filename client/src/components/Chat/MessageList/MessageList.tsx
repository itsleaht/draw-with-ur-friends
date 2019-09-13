import React, { FunctionComponent, useState, useRef, useEffect } from 'react'

import Message from '../Message/Message'

import useSocketOn from '../../../hooks/useSocketOn'

import { IMessage, IRoomJoined } from '../../../@types'
import { Events } from '../../../config/events'

import './_message-list.styl'
import { useSelector } from 'react-redux'
import { State } from '../../../store/types'

type Props = {
  userId: string
}

const MessageList: FunctionComponent<Props> = ({userId}) => {
  const messageListRef = useRef<HTMLUListElement>(null)
  const messages = useSelector<State, IMessage[]>(state => state.app.room.messages)

  const scrollDown = () => {
    if (messageListRef.current) {
      const height = messageListRef.current.scrollHeight
      messageListRef.current.scrollTo(0, height)
    }
  }

  useSocketOn(Events.RoomGetNewMessage, () => {
    scrollDown()
  })

  useEffect(() => {
    scrollDown()
  }, [])

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
