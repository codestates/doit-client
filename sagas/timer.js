import {
  all,
  fork,
  takeLatest,
  call,
  put,
  take,
  delay,
  cancel,
} from 'redux-saga/effects';
import axios from 'axios';

import { getCookie } from '../utils/cookieHelper';
import { setToken } from '../sagas';
import {
  START_TIMER_AND_TODO_CREATE_SUCCESS,
  START_TIMER_AND_TODO_CREATE_FAILURE,
  START_TIMER_AND_TODO_CREATE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAILURE,
  TODO_COMPLETE_REQUEST,
  RESET_TIMER,
  ADD_SECOND,
  PAUSE_TIMER,
  RESUME_TIMER,
} from '../reducers/timer';

function* startTimer() {
  const timerTask = yield fork(tick);
  yield take([PAUSE_TIMER, RESET_TIMER]);
  yield cancel(timerTask);
}

function* tick() {
  while (true) {
    yield delay(1000);
    yield put({ type: ADD_SECOND });
  }
}

function* watchStartTimer() {
  yield takeLatest(
    [START_TIMER_AND_TODO_CREATE_REQUEST, RESUME_TIMER],
    startTimer,
  );
}

function startTimerAndTodoCreateAPI(todoCreateData) {
  setToken(() => getCookie('token'));
  return axios.post(`/todo`, todoCreateData, {
    withCredentials: true,
  });
}

function* startTimerAndTodoCreate(action) {
  try {
    const result = yield call(startTimerAndTodoCreateAPI, action.data);
    yield put({
      type: START_TIMER_AND_TODO_CREATE_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
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
  setToken(() => getCookie('token'));
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
    yield put({
      type: TODO_COMPLETE_FAILURE,
      error: e,
    });
  }
}

function* watchTodoComplete() {
  yield takeLatest(TODO_COMPLETE_REQUEST, todoComplete);
}

// reset
function todoResetAPI(todoResetData) {
  setToken(() => getCookie('token'));
  return axios.delete(`/todo/${todoResetData.todoId}`, {
    withCredentials: true,
  });
}

function* todoReset(action) {
  try {
    yield call(todoResetAPI, action.data);
  } catch (e) {
    console.error(e);
  }
}

function* watchTodoReset() {
  yield takeLatest(RESET_TIMER, todoReset);
}

function* todoTimerSaga() {
  yield all([
    fork(watchstartTimerAndTodoCreate),
    fork(watchTodoComplete),
    fork(watchTodoReset),
    fork(watchStartTimer),
  ]);
}

export default todoTimerSaga;
