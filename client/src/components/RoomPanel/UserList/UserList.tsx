import React, { FunctionComponent } from 'react';
import { IUser } from '../../../@types';
import './_list-users.styl'

type Props = {
  users: IUser[],
  userId: string
}

const UserList: FunctionComponent<Props> = ({users, userId}) => {

  return (
    <ul className="list list--users">
      { users.map((user, index) => {
        return (<li key={index} className={`list__item ${userId === user.id ? 'is-active' : ''}`}>{user.name} {userId === user.id ? '(you)' : ''}</li>);
      })}
    </ul>
  )
}


export default UserList;
