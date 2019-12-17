import {
  all,
  fork,
  takeLatest,
  takeEvery,
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
  START_TIMER_AND_TODO_CREATE_REQUEST,
  START_TIMER_AND_TODO_CREATE_SUCCESS,
  START_TIMER_AND_TODO_CREATE_FAILURE,
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_SUCCESS,
  TODO_COMPLETE_FAILURE,
  TODO_PAUSE_REQUEST,
  TODO_PAUSE_SUCCESS,
  TODO_PAUSE_FAILURE,
  TODO_RESUME_REQUEST,
  TODO_RESUME_SUCCESS,
  TODO_RESUME_FAILURE,
  RESET_TIMER,
  ADD_SECOND,
} from '../reducers/timer';

function* startTimer() {
  const timerTask = yield fork(tick);
  yield take([
    START_TIMER_AND_TODO_CREATE_FAILURE,
    TODO_PAUSE_REQUEST,
    TODO_RESUME_FAILURE,
    RESET_TIMER,
  ]);
  yield cancel(timerTask);
}

function* tick() {
  while (true) {
    yield delay(950);
    yield put({ type: ADD_SECOND });
  }
}

function* watchStartTimer() {
  yield takeLatest(
    [
      START_TIMER_AND_TODO_CREATE_REQUEST,
      TODO_RESUME_REQUEST,
      TODO_PAUSE_FAILURE,
    ],
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
  }
}

function* watchTodoReset() {
  yield takeLatest(RESET_TIMER, todoReset);
}

// pause
function todoPauseAPI(todoPauseData) {
  setToken(() => getCookie('token'));
  return axios.post(`/todo/pause`, todoPauseData, {
    withCredentials: true,
  });
}

function* todoPause(action) {
  if (action.data) {
    try {
      yield call(todoPauseAPI, action.data);
      yield put({
        type: TODO_PAUSE_SUCCESS,
      });
    } catch (e) {
      yield put({
        type: TODO_PAUSE_FAILURE,
        error: e,
      });
    }
  } else {
    yield put({
      type: TODO_PAUSE_SUCCESS,
    });
  }
}

function* watchTodoPause() {
  yield takeEvery(TODO_PAUSE_REQUEST, todoPause);
}

// resume
function todoResumeAPI(todoResumeData) {
  // console.log('todoResumeData in saga', todoResumeData);
  setToken(() => getCookie('token'));
  return axios.post(`/todo/resume`, todoResumeData, {
    withCredentials: true,
  });
}

function* todoResume(action) {
  try {
    const result = yield call(todoResumeAPI, action.data);
    yield put({
      type: TODO_RESUME_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    yield put({
      type: TODO_RESUME_FAILURE,
      error: e,
    });
  }
}

function* watchTodoResume() {
  yield takeEvery(TODO_RESUME_REQUEST, todoResume);
}

function* todoTimerSaga() {
  yield all([
    fork(watchstartTimerAndTodoCreate),
    fork(watchTodoComplete),
    fork(watchTodoReset),
    fork(watchTodoPause),
    fork(watchTodoResume),
    fork(watchStartTimer),
  ]);
}

export default todoTimerSaga;
