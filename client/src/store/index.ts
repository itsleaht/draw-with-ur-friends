import { createStore, Store, combineReducers } from 'redux';
import appReducer from './reducers/appReducer';
import drawReducer from './reducers/drawReducer';
import { State } from './types';


const rootReducer = combineReducers({
  app: appReducer,
  draw: drawReducer
});

export const store: Store<State, any> = createStore(
  rootReducer
);
