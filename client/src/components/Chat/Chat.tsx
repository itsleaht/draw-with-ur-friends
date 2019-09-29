
import React, { FunctionComponent, useState, useEffect } from 'react'
import MessageList from './MessageList/MessageList'
import MessageForm from './MessageForm/MessageForm'
import ChatNotification from './ChatNotification/ChatNotification'
import Icon from '../UI/icons/Icon'

import { useSelector, useDispatch } from 'react-redux'
import useSocketOn from '../../hooks/useSocketOn'

import { State, User } from '../../store/types'
import { IRoom } from './../../@types'
import { Events } from '../../config/events'

import './_chat.styl'
import appSelector from '../../store/selectors/appSelector'
import { ActionTypes } from '../../store/actionTypes'

const Chat: FunctionComponent = () => {
  const [isMinified, setIsMinified] = useState<boolean>(true)
  const [isNotified, setIsNotified] = useState<boolean>(false)
  const [counterNotification, setCounterNotification] = useState<number>(0)
  const canDraw = useSelector<State, boolean>(appSelector.canDraw)
  const isChatOpen = useSelector<State, boolean>(appSelector.isChatOpen)

  const dispatch = useDispatch()

  const maxCounterNotification = 99

  const room = useSelector<State, IRoom>(state => appSelector.room(state))
  const user = useSelector<State, User>(state => appSelector.user(state))

  const isRoomPanelOpened = useSelector<State, boolean>(state => appSelector.isRoomPanelOpen(state))

  const onClickToggle = () => {
    setIsMinified(!isMinified)

    dispatch({type: ActionTypes.SetIsChatOpen, payload: isMinified})

    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      setCounterNotification(0)
      setIsNotified(false)
    }, 350)
  }

  useSocketOn(Events.RoomGetNewMessage, () => {
    if (isMinified && counterNotification <= maxCounterNotification) {
      setCounterNotification(counterNotification + 1)
      if (!isNotified) {
        setIsNotified(true)
      }
    }
  })

  useEffect(() => {
    if (!canDraw && !isMinified) {
      setIsMinified(true)
    }
  }, [canDraw])

  return (
    <div className={`chat ${isMinified ? 'is-minified' : ''} ${isNotified ? 'is-notified' : ''} ${isRoomPanelOpened ? 'is-translated' : ''}`}>
      {user.id.length > 0 &&
        <div className="chat__inner">
          <div className="chat__header">
            <div className="chat__header__left">
              <ChatNotification counter={counterNotification} maxCounter={maxCounterNotification} />
            </div>
            <div className="chat__header__center">
              <span className="heading-3 chat__title">{room.name}</span>
              <span className="tag chat__subtitle">{room.users!.length} members</span>
            </div>
            <div className="chat__header__right">
              <button className="chat__toggle" onClick={onClickToggle}>
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
      }
    </div>
  )
}

export default Chat
