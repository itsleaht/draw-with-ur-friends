import { ActionTypes } from '../actionTypes';

import { DrawState } from '../types';

const initialState: DrawState = {
  pen: {index: ''}
};


const drawReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SetPen:
      return {
        ...state,
        pen: {index: action.payload}
      }

    default:
      return state;
  }
}

export default drawReducer;