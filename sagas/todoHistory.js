import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { getCookie } from '../utils/cookieHelper';
import { setToken } from '../sagas';
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from '../reducers/todoHistory';

function loadTodosAPI(loadData) {
  setToken(() => getCookie('token'));
  return axios.get(`/todos/${loadData.date}`, {
    withCredentials: true,
  });
}

function* loadTodos(action) {
  try {
    const result = yield call(loadTodosAPI, action.data);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: result.data.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_TODOS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadTodos() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
}

function* todoHistorySaga() {
  yield all([fork(watchLoadTodos)]);
}

export default todoHistorySaga;
