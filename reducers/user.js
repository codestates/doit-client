// ACTION
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

// INITIAL
const initialState = {
  isLoggingIn: false,
  loginError: '',
  me: null,
};

// me: {
//   userId: 1,
//   nickname: 'aaa',
// }

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return applyLoginRequest(state, action);
    case LOG_IN_SUCCESS:
      return applyLoginSuccess(state, action);
    case LOG_IN_FAILURE:
      return applyLoginFailure(state, action);
    case LOG_OUT_REQUEST:
      return applyLogoutRequest(state, action);
    case LOG_OUT_SUCCESS:
      return applyLogoutRequest(state, action);
    case LOG_OUT_FAILURE:
      return applyLogoutRequest(state, action);
    case LOAD_USER_REQUEST:
      return applyLoadUserRequest(state, action);
    case LOAD_USER_SUCCESS:
      return applyLoadUserSuccess(state, action);
    case LOAD_USER_FAILURE:
      return applyLoadUserFailure(state, action);
    default: {
      return state;
    }
  }
};

const applyLoginRequest = (state, action) => {
  return {
    ...state,
    isLoggingIn: true,
    loginError: '',
    me: null,
  };
};

const applyLoginSuccess = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    me: action.payload,
  };
};

const applyLoginFailure = (state, action) => {
  return {
    ...state,
    isLoggingIn: false,
    loginError: action.error,
    me: null,
  };
};

const applyLogoutRequest = (state, action) => {
  return {
    ...state,
    me: null,
  };
};

const applyLoadUserRequest = (state, action) => {
  return {
    ...state,
    loginError: '',
    me: null,
  };
};

const applyLoadUserSuccess = (state, action) => {
  return {
    ...state,
    me: action.payload,
  };
};

const applyLoadUserFailure = (state, action) => {
  return {
    ...state,
    loginError: action.error,
    me: null,
  };
};

export default reducer;
