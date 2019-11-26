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
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
} from '../reducers/user';
import { setToken } from '../sagas';

function loginAPI(userData) {
  return axios.post(`/user/login`, userData, {
    withCredentials: true,
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    setToken(() => result.data.data.token);
    yield call(setCookie, {
      key: 'token',
      value: result.data.data.token,
    });
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
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
  setToken(() => '');
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
    setToken(() => result.data.data.token);
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
      error: e.response.data.message,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

//google auth
function googleAuthAPI(token) {
  return axios.post(`/user/auth/google`, token, {
    withCredentials: true,
  });
}

function* googleAuth(action) {
  try {
    const result = yield call(googleAuthAPI, action.token);
    setToken(() => result.data.data.token);
    yield call(setCookie, {
      key: 'token',
      value: result.data.data.token,
    });
    yield put({
      type: GOOGLE_AUTH_SUCCESS,
      payload: result.data.data,
    });
  } catch (e) {
    yield put({
      type: GOOGLE_AUTH_FAILURE,
      error: e.response.data.message,
    });
  }
}

function* watchGoogleAuth() {
  yield takeLatest(GOOGLE_AUTH_REQUEST, googleAuth);
}

function* todoUserSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignup),
    fork(watchGoogleAuth),
  ]);
}

export default todoUserSaga;
