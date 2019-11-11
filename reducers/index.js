import { combineReducers } from 'redux';
import todoHistory from './todoHistory';

const rootReducer = combineReducers({
  todoHistory,
});

export default rootReducer;
