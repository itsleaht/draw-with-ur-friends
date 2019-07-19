import { SET_DRAW_PEN } from '../actionTypes';
import { DrawState } from '../types';


const initialState: DrawState = {
  pen: {index: ''}
};


const drawReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_DRAW_PEN:
      return {
        ...state,
        pen: {index: action.payload.index}
      }

    default:
      return state;
  }
}

export default drawReducer;
