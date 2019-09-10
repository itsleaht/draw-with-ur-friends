import React, { useEffect } from 'react'

import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { State } from '../../store/types'

import Header from '../../components/Header/Header'
import DrawCanvas from '../../components/DrawCanvas/DrawCanvas'
import RoomPanel from '../../components/RoomPanel/RoomPanel'
import Chat from '../../components/Chat/Chat'

type Props = {}

const Draw = ({ history } : RouteComponentProps<Props>) => {
  // const user = useSelector<State, {id: string}>(state => state.app.user)

  // const checkUserId = () => {
  //   if ( !user || !user.id || user.id.length <= 0) {
  //     history.push('/')
  //   }
  // }

  // useEffect(() => {
  //   checkUserId()
  // }, [user])

  return (
    <div className="page page--draw">
      <Header isFull={true} />
      <main className="main">
        <DrawCanvas />
      </main>
      <div className="aside">
        <RoomPanel />
        <Chat />
      </div>
    </div>
  )
}

export default Draw
