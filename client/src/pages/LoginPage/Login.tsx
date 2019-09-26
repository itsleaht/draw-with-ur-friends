import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { State } from '../../store/types'
import { RouteComponentProps } from 'react-router-dom'

import { IRoom } from '../../@types'

import Header from '../../components/Header/Header'
import BoxLogin from '../../components/BoxLogin/BoxLogin'

import './_login.styl'
import appSelector from '../../store/selectors/appSelector'

type Props = {}

const Login = ({ history }: RouteComponentProps<Props>) => {
  const [isUserReady, setIsUserReady] = useState<boolean>(false)
  const user = useSelector<State, {id: string}>(state => appSelector.user(state))
  const room = useSelector<State, IRoom>(state => appSelector.room(state))

  const isServerReady = useSelector<State, boolean>(state => appSelector.isServerReady(state))

  const checkUser = () => {
    return (user.id && user.id.length > 0 && room.id && room.id.length > 0)
  }

  const onValidateBox = () => {
    history.push('/draw')
  }

  useEffect(() => {
    if (checkUser()) {
      setIsUserReady(true)
    }
  }, [user, room])

  return (
    <div className="page page--login">
      <Header isFull={false} />
      <div className="page__inner">
        <div className="page__top">
        </div>
        <div className="page__body">
          <BoxLogin isServerReady={isServerReady} user={user} isUserReady={isUserReady} onValidateBox={onValidateBox} />
        </div>
        <div className="page__bottom">
          <a href="/about" className="link link--primary">About</a>
        </div>
      </div>
    </div>
  )
}

export default Login
