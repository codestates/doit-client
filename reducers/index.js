import { combineReducers } from 'redux';
import timer from './timer';
import user from './user';
import todoHistory from './todoHistory';
import feedback from './feedback';

const rootReducer = combineReducers({
  timer,
  todoHistory,
  user,
  feedback,
});

export default rootReducer;
