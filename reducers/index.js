import { combineReducers } from 'redux';
import timer from './timer';
import user from './user';
import todoHistory from './todoHistory';

const rootReducer = combineReducers({
  timer,
  todoHistory,
  user,
});

export default rootReducer;
