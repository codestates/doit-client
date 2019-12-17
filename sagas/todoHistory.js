import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { getCookie } from '../utils/cookieHelper';
import { setToken } from '../sagas';
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  DELETE_HISTORY_REQUEST,
  DELETE_HISTORY_SUCCESS,
  DELETE_HISTORY_FAILURE,
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

function deleteHistoryAPI(deleteId) {
  setToken(() => getCookie('token'));
  return axios.delete(`/todo/${deleteId}`, {
    withCredentials: true,
  });
}

function* deleteHistory(action) {
  try {
    yield call(deleteHistoryAPI, action.payload);
    yield put({
      type: DELETE_HISTORY_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: DELETE_HISTORY_FAILURE,
      error: e,
    });
  }
}

function* watchDeleteHistory() {
  yield takeLatest(DELETE_HISTORY_REQUEST, deleteHistory);
}

function* todoHistorySaga() {
  yield all([fork(watchLoadTodos), fork(watchDeleteHistory)]);
}

export default todoHistorySaga;
