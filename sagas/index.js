import { all, call } from 'redux-saga/effects';
import axios from 'axios';

import todoHistory from './todoHistory';
import user from './user';
import timer from './timer';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://api.doitreviews.com:8085/api'
    : `http://localhost:8085/api`;

function* rootSaga() {
  yield all([call(todoHistory), call(user), call(timer)]);
}

export default rootSaga;
