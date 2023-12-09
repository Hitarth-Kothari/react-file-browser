// store.js
import { createStore, combineReducers } from 'redux';
import explorerReducer from './reducer';

const rootReducer = combineReducers({
  explorer: explorerReducer,
});

const store = createStore(rootReducer);

export default store;
