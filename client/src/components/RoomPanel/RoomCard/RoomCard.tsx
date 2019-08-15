import React, { FunctionComponent } from 'react';
import { IRoom } from '../../../@types';
import DotNumber from '../../UI/misc/DotNumber/DotNumber';

import './_card-room.styl';
import ButtonPrimary from '../../UI/buttons/ButtonPrimary/ButtonPrimary';

type Props = {
  userId: String,
  room: IRoom,
  isActive: Boolean,
  onClickClb: (id: string) => void
}

const RoomCard: FunctionComponent<Props> = ({userId, room, isActive, onClickClb}) => {

  return (
    <div className={`card card--room ${isActive ? 'is-active' : ''}`}>
      <div className="card__inner">
        <div className="card__top">
          <div className="card__top__left">
            <span className={`card__title ${isActive ? 'heading-3' : ''}`}>{room.name}</span>
            <DotNumber number={room.users.length} extraClasses="card__number" />
          </div>
          { !isActive &&
            <div className="card__top__right">
              <ButtonPrimary className="card__button" onClickClb={() => onClickClb(room.id)} text={'Join'} />
            </div>
          }
        </div>
        {
          isActive &&
          <div className="card__body">
            <ul className="list list--users">
              { room.users.map((user, index) => {
                  return (
                    <li key={`room-card-user-${index}`} className={`list__item tag ${userId === user.id ? 'is-active' : ''}`}>{user.name}</li>
                  )
                })
              }
            </ul>
          </div>
        }
      </div>
    </div>
  )
}


export default RoomCard;
