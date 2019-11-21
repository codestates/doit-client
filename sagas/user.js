import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import { setCookie, removeCookie } from '../utils/cookieHelper';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
} from '../reducers/user';

function loginAPI(userData) {
  return axios.post(`/user/login`, userData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${result.data.data.token}`;
    yield call(setCookie, {
      key: 'token',
      value: result.data.data.token,
    });
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* logout() {
  axios.defaults.headers.common['Authorization'] = '';
  yield call(removeCookie, 'token');
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function loadUserAPI() {
  return axios.get(`/user`, { withCredentials: true });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    // console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

//signup
function signupAPI(userData) {
  return axios.post(`/user/signup`, userData, {
    withCredentials: true,
  });
}

function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${result.data.data.token}`;
    yield call(setCookie, {
      key: 'token',
      value: result.data.data.token,
    });
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* todoHistorySaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignup),
  ]);
}

export default todoHistorySaga;
