import React, { FunctionComponent } from 'react'
import SocketManager from '../../../modules/SocketManager'
import { useSelector } from 'react-redux'

import ToolBox from '../ToolBox/ToolBox'
import Icon from '../../UI/icons/Icon'

import { Events } from '../../../config/events'
import appSelector from '../../../store/selectors/appSelector'
import { State } from '../../../store/types'
import { IRoom } from '../../../@types'

import './_toolbox-clear.styl'

const ClearToolbox: FunctionComponent = () => {
  const room = useSelector<State, IRoom>(appSelector.room)

  const onClick = () => {
    SocketManager.emit(Events.RoomClearDraw, room.id)
  }

  return (
    <ToolBox type="clear">
        <span className="toolbox__title tag">Clear</span>
        <div className="toolbox__body">
          <button className="toolbox__icon" onClick={onClick}>
            <Icon name="close" width={14} height={14} fill="#000" />
          </button>
          <span className="toolbox__tooltip">
            <span>⚠️</span> This will clear all the artboard
          </span>
        </div>
      </ToolBox>
  )
}

export default ClearToolbox
