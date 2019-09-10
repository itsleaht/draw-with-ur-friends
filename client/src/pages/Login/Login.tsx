import React, { useEffect, useState } from 'react'

import { Events } from '../../config/events'
import { useSelector } from 'react-redux'
import { State } from '../../store/types'
import { RouteComponentProps } from 'react-router-dom'

import Header from '../../components/Header/Header'
import ButtonPrimary from '../../components/UI/buttons/ButtonPrimary/ButtonPrimary'
import SocketManager from '../../modules/SocketManager'

import './login.styl'

type Props = {}

const Login = ({ history }: RouteComponentProps<Props>) => {

  const [username, setUsername] = useState<string>('')
  const [isJoinAllowed, setIsJoinAllowed] = useState<boolean>(false)
  const user = useSelector<State, {id: string}>(state => state.app.user)

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
    if (username.length >= 3) {
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
    history.push('/draw')
  }

  useEffect(() => {
    checkUsername()
  }, [username])

  return (
    <div className="page page--login">
      <Header isFull={false} />
      <div className="page__inner">
        <div className="page__top">
        </div>
        <div className="page__body">
          <div className="box box--login">
            <div className="box__top">
              <span className="heading-5 box__type">DWUF | Log in</span>
            </div>
            <div className="box__body">
              <h1 className="box__title heading-1">Hi friend ! 👋 </h1>
              <p className="box__text teasing-1">Welcome to <span className="highlight">Draw with your friends</span>, the only place where to have fun with your fellow human beings.</p>
              <p className="box__text teasing-1">To join the club, please enter your username :</p>
            </div>
            <div className="form">
              <div className="form__group">
                <label className="form__label heading-6" htmlFor="username">Username</label>
                <input className="form__input" id="username" name="username" type="text" placeholder="John Doe" value={username} onChange={onInputChange} onKeyPress={onInputKeyPress} />
              </div>
            </div>
            <div className="box__bottom">
              <ButtonPrimary className={''} isBig={true} isDisabled={!isJoinAllowed} text={'Join the party'} onClickClb={onClickBtn} />
            </div>
          </div>
        </div>
        <div className="page__bottom">
          <a href="#" className="link link--primary">About</a>
        </div>
      </div>
    </div>
  )
}

export default Login
