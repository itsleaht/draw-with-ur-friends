import { createStore, Store, combineReducers } from 'redux';
import appReducer from './reducers/appReducer';
import drawReducer from './reducers/drawReducer';


const rootReducer = combineReducers({
  app: appReducer,
  draw: drawReducer
})

export const store: Store<{}, any> = createStore(
  rootReducer
);
