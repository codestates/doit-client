import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { getCookie } from '../utils/cookieHelper';
import { setToken } from '../sagas';
import {
  FEEDBACK_FAILURE,
  FEEDBACK_SUCCESS,
  FEEDBACK_REQUEST,
} from '../reducers/feedback';

function feedbackAPI(info) {
  setToken(() => getCookie('token'));
  return axios.post(`/feedback`, info, {
    withCredentials: true,
  });
}

function* makeFeedback(action) {
  try {
    yield call(feedbackAPI, action.payload);
    yield put({
      type: FEEDBACK_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: FEEDBACK_FAILURE,
      payload: error.response.data.message,
    });
  }
}

function* watchFeedback() {
  yield takeLatest(FEEDBACK_REQUEST, makeFeedback);
}

function* feedbackSaga() {
  yield all([fork(watchFeedback)]);
}

export default feedbackSaga;
