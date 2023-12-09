// store.js
import { createStore, combineReducers } from 'redux';
import explorerReducer from './reducers';

const rootReducer = combineReducers({
  explorer: explorerReducer,
});

const store = createStore(rootReducer);

export default store;
