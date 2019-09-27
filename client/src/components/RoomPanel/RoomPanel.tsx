import React, { FunctionComponent, useState } from 'react'
import RoomList from './RoomList/RoomList'
import Icon from '../UI/icons/Icon'
import ButtonPrimary from '../UI/buttons/ButtonPrimary/ButtonPrimary'

import { useSelector, useDispatch } from 'react-redux'
import useSocket from '../../hooks/useSocket'
import { Events } from '../../config/events'
import { ActionTypes } from '../../store/actionTypes'

import { IRoom, IRoomJoin } from '../../@types'
import { State, User } from '../../store/types'
import BadgeNumber from '../UI/misc/BadgeNumber/BadgeNumber'

import './_room-panel.styl'
import appSelector from '../../store/selectors/appSelector'

const RoomPanel: FunctionComponent = () => {
  const socket = useSocket()
  const user = useSelector<State, User>(state => appSelector.user(state))
  const room = useSelector<State, IRoom>(state =>  appSelector.room(state))
  const rooms = useSelector<State, IRoom[]>(state => appSelector.roomsOrdered(state, room.id))
  // const rooms = useSelector<State, IRoom[]>(state => appSelector.rooms(state))
  const dispatch = useDispatch()

  const defaultRoomName = 'New room'

  const [isMinified, setIsMinified] = useState<Boolean>(true)
  const [roomName, setRoomName] = useState<string>(defaultRoomName)
  const [isFocusing, setIsFocusing] = useState<Boolean>(false)

  const onClickCreateRoom = () => {
    if (roomName.length > 0) {
      joinRoom({id: '', name: roomName})
      setRoomName('')
    }
  }

  const joinRoom = (to: IRoomJoin) => {
    socket!.emit(Events.RoomJoin, {
      from: {id: room.id},
      to: to
    })
  }

  const onClickRoomClb = (roomId: string) => {
    if (roomId !== room.id) {
      joinRoom({id: roomId})
    }
  }

  const onClickBtnClb = () => {
    setIsMinified(!isMinified)
    dispatch({type: ActionTypes.SetIsRoomPanelOpen, payload: isMinified})
  }

  const onFocusRoomName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (defaultRoomName === e.target.value) {
      setRoomName('')
    }
    setIsFocusing(true)
  }

  const onBlurRoomName = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocusing(false)

    if (e.target.value.length <= 0) {
      setRoomName(defaultRoomName)
    }
  }

  const onChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value)
  }

  return (
    <>
      <button onClick={onClickBtnClb} className="panel--room__trigger">
        <Icon name="menu" width={26} height={28}  fill="#3514FF" />
      </button>
      <div className={`panel panel--room ${isMinified ? 'is-minified' : ''}`}>
        <div className="panel__inner">
          <div className="panel__top">
            <h1 className="panel__title heading-2">Artboards</h1>
              <BadgeNumber number={rooms.length} extraClasses={'panel__badge'}/>
          </div>
          <div className="panel__body">
            <div className={`card card--room-create`}>
              <div className="card__inner">
                <div className="card__left">
                  <span className={`card__title`}>
                    <input type="text" name="newRoomName" className="card__input" value={roomName} onChange={onChangeRoomName} onFocus={onFocusRoomName} onBlur={onBlurRoomName} />
                  </span>
                </div>
                  <div className="card__right">
                    <ButtonPrimary text={'Create'} isDisabled={!isFocusing} className={`card__button ${isFocusing ? 'is-focusing' : ''}`} onClickClb={onClickCreateRoom} />
                  </div>
              </div>
          </div>
          </div>
          <div className="panel__bottom">
            <RoomList userId={user.id}rooms={rooms} roomId={room.id} onClickRoomClb={onClickRoomClb} />
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomPanel
