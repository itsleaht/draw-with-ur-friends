import { createStore, Store } from 'redux';
import appStore from './reducers/appStore';

export const store: Store<{}, any> = createStore(
  appStore
);
