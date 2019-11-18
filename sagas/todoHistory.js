import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from '../reducers/todoHistory';

function loadTodosAPI(date) {
  return axios.get(`/todos/${date}`, {
    withCredentials: true,
  });
}

function* loadTodos(action) {
  try {
    const result = yield call(loadTodosAPI, action.date);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: result.data.data,
    });
  } catch (e) {
    console.error(e);
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
