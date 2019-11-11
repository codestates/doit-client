import { all, call } from 'redux-saga/effects';
import axios from 'axios';

import todoHistory from './todoHistory';

axios.defaults.baseURL = `http://15.164.163.120:8085/api`;

function* rootSaga() {
  yield all([call(todoHistory)]);
}

export default rootSaga;
