import { SET_USER, SET_ROOM } from '../actionTypes';
import { AppState } from '../types';


const initialState: AppState = {
  user: {id: ''},
  room: {id: ''}
};


const appReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id
        }
      }

    case SET_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          id: action.payload.id,
          name: action.payload.name
        }
      }

    default:
      return state;
  }
}

export default appReducer;
