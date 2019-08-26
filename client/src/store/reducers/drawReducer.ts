import { ActionTypes } from '../actionTypes'

import { DrawState } from '../types';

const initialState: DrawState = {
  brush: { index: '' },
  color: {hex: '' }
};


const drawReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SetBrush:
      return {
        ...state,
        brush: {index: action.payload}
      }
    case ActionTypes.SetColor:
      return {
        ...state,
        color: {hex: action.payload}
      }
    default:
      return state
  }
}

export default drawReducer
