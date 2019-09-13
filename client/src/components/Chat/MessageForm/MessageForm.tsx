import React, { FunctionComponent, useState, createRef } from 'react'

import { useSelector } from 'react-redux'
import useSocket from '../../../hooks/useSocket'

import { State } from '../../../store/types'

import { addLog } from '../../../helpers/utils'

import { Events } from '../../../config/events'

import './_message-form.styl'
import ButtonPrimary from '../../UI/buttons/ButtonPrimary/ButtonPrimary'

type Props = {
  userId: string
}

const MessageForm: FunctionComponent<Props>  = ({ userId }) => {
  const [content, setContent] = useState<string>('')
  const roomId = useSelector<State, string>(state => state.app.room.id)
  const socket = useSocket()

  const formMessage = createRef<HTMLFormElement>()

  const onFormSubmit = () => {
    addLog('on', 'form:submit', roomId)
    if (content.length > 0) {
      socket!.emit(Events.RoomAddMessage, { content, userId, roomId })
    }
    setContent('')
  }

  const onTextareaKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.keyCode || e.which) === 13) {
      e.preventDefault()
      if (formMessage && formMessage.current) {
        onFormSubmit()
      }
      return false
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value
    setContent(message)
  }

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onFormSubmit()
  }

  return (
    <form className="form form--message" onSubmit={onFormSubmit} ref={formMessage}>
      <div className="form__wrapper">
        <textarea onChange={onInputChange} className="form__textarea" value={content} onKeyPress={onTextareaKeyPress}></textarea>
      </div>
      <button type="submit" className={`form__submit btn--primary ${(content.length > 0 ) ? '' : 'is-disabled'}`} onClick={onClickButton}>Send</button>
    </form>
  )
}

export default MessageForm
