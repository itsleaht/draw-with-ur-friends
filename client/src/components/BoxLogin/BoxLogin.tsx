import React, { FunctionComponent, useState, useEffect } from "react"
import SocketManager from "../../modules/SocketManager"
import { Events } from "../../config/events"

import ButtonPrimary from "../UI/buttons/ButtonPrimary/ButtonPrimary"

import './_box-login.styl'

type Props = {
  isServerReady: boolean,
  isUserReady: boolean,
  user: { id: string },
  onValidateBox: Function
}

const BoxLogin: FunctionComponent<Props> = ({user, isServerReady, isUserReady, onValidateBox}) => {

  const [username, setUsername] = useState<string>('')
  const [isJoinAllowed, setIsJoinAllowed] = useState<boolean>(false)
  const minUsernameLength = 3

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.keyCode || e.which) === 13) {
      e.preventDefault()
      checkUsername()
      return false
    }
  }

  const checkUsername = () => {
    if (username.length >= minUsernameLength) {
      setIsJoinAllowed(true)
    } else {
      setIsJoinAllowed(false)
    }
  }

  const onClickBtn = () => {
    SocketManager.emit(Events.UserName, {
      id: user.id,
      name: username
    })
    onValidateBox()
  }

  useEffect(() => {
    checkUsername()
  }, [username])

  return (
    <>
      <div className={`box box--login ${isServerReady && isUserReady ? 'is-visible' : ''}`}>
        <div className="box__inner">
          <div className="box__top">
            <span className="tag box__type">DWUF | Log in</span>
          </div>
          <div className="box__body">
            <h1 className="box__title heading-1">Hi friend ! <span className="box__emoji">👋</span> </h1>
            <p className="box__text teasing-1">Welcome to <span className="highlight">Draw with your friends</span>, the only place where to have fun with your fellow human beings.</p>
            <p className="box__text teasing-1">To join the club, please enter your username :</p>
          </div>
          <div className="form">
            <div className="form__group">
              <label className="form__label tag" htmlFor="username">Username</label>
              <input className="form__input" id="username" name="name" type="text" placeholder="John Doe" value={username} onChange={onInputChange} onKeyPress={onInputKeyPress} />
            </div>
          </div>
          <div className="box__bottom">
            <ButtonPrimary className={''} isBig={true} isDisabled={!isJoinAllowed} text={'Join the party'} onClickClb={onClickBtn} />
          </div>
        </div>
      </div>
      <div className={`box box--loading ${isServerReady && isUserReady ? '' : 'is-visible'}`}>
          <div className="box__top">
            <span className="tag box__type">DWUF | Loading</span>
          </div>
        <h1 className="heading-2">Please wait for the servers dinos to wake...</h1>
      </div>
    </>
  )
}

export default BoxLogin
