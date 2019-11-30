import { all, call } from 'redux-saga/effects';
import axios from 'axios';

import todoHistory from './todoHistory';
import user from './user';
import timer from './timer';
import feedback from './feedback';

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'https://api.doitreviews.com/api'
//     : `http://localhost:8085/api`;

axios.defaults.baseURL = 'https://api.doitreviews.com/api';

export const setToken = (f) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${f()}`;
};

function* rootSaga() {
  yield all([call(todoHistory), call(user), call(timer), call(feedback)]);
}

export default rootSaga;
