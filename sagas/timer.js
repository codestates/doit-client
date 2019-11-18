import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  START_TIMER_AND_TODO_CREATE_SUCCESS,
  START_TIMER_AND_TODO_CREATE_FAILURE,
  START_TIMER_AND_TODO_CREATE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAILURE,
  TODO_COMPLETE_REQUEST,
} from '../reducers/timer';

function startTimerAndTodoCreateAPI(todoCreateData) {
  // console.log('SAGA: ', todoCreateData);
  return axios.post(`/todo`, todoCreateData, {
    withCredentials: true,
  });
}

function* startTimerAndTodoCreate(action) {
  try {
    const result = yield call(startTimerAndTodoCreateAPI, action.data);
    // console.log('SAGA - result: ', result);
    yield put({
      type: START_TIMER_AND_TODO_CREATE_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: START_TIMER_AND_TODO_CREATE_FAILURE,
      error: e,
    });
  }
}

function* watchstartTimerAndTodoCreate() {
  yield takeLatest(
    START_TIMER_AND_TODO_CREATE_REQUEST,
    startTimerAndTodoCreate,
  );
}

function todoCompleteAPI(todoCompleteData) {
  return axios.patch(`/todo`, todoCompleteData, {
    withCredentials: true,
  });
}

function* todoComplete(action) {
  try {
    const result = yield call(todoCompleteAPI, action.data);
    yield put({
      type: TODO_COMPLETE_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: TODO_COMPLETE_FAILURE,
      error: e,
    });
  }
}

function* watchTodoComplete() {
  yield takeLatest(TODO_COMPLETE_REQUEST, todoComplete);
}
function* todoTimerSaga() {
  yield all([fork(watchstartTimerAndTodoCreate), fork(watchTodoComplete)]);
}

export default todoTimerSaga;
