import { all, call } from 'redux-saga/effects';
import axios from 'axios';

import todoHistory from './todoHistory';
import user from './user';
import timer from './timer';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.doitreviews.com/api'
    : `http://localhost:8085/api`;

// axios.defaults.baseURL = 'https://api.doitreviews.com/api';

function* rootSaga() {
  yield all([call(todoHistory), call(user), call(timer)]);
}

export default rootSaga;
