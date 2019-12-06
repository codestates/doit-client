// ACTION
export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const DELETE_HISTORY_REQUEST = 'DELETE_HISTORY_REQUEST';
export const DELETE_HISTORY_SUCCESS = 'DELETE_HISTORY_SUCCESS';
export const DELETE_HISTORY_FAILURE = 'DELETE_HISTORY_FAILURE';
export const DELETE_HISTORY_CLEANUP = 'DELETE_HISTORY_CLEANUP';

// INITIAL
const initialState = {
  date: '',
  todos: [],
  todosCount: [],
  deleteHistoryId: '',
  deleteHistorySuccess: false,
  deleteHistoryError: '',
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS_REQUEST: {
      return applyLoadTodosRequest(state, action);
    }
    case LOAD_TODOS_SUCCESS: {
      return applyLoadTodosSuccess(state, action);
    }
    case LOAD_TODOS_FAILURE: {
      return applyLoadTodosFailure(state, action);
    }
    case DELETE_HISTORY_REQUEST: {
      return applyDeleteHistoryRequest(state, action);
    }
    case DELETE_HISTORY_SUCCESS: {
      return applyDeleteHistorySuccess(state, action);
    }
    case DELETE_HISTORY_FAILURE: {
      return applyDeleteHistoryFailure(state, action);
    }
    case DELETE_HISTORY_CLEANUP: {
      return applyDeleteHistoryCleanup(state, action);
    }

    default: {
      return state;
    }
  }
};

const applyLoadTodosRequest = (state, action) => {
  return {
    ...state,
    date: action.data.date,
    todos: [],
  };
};

const applyLoadTodosSuccess = (state, action) => {
  return {
    ...state,
    todos: action.data.todos.length === 0 ? [] : action.data.todos,
    todosCount:
      action.data.todosCount.length === 0 ? [] : action.data.todosCount,
  };
};

const applyLoadTodosFailure = (state, action) => {
  return {
    ...state,
    todos: [],
  };
};

const applyDeleteHistoryRequest = (state, action) => {
  return {
    ...state,
    deleteHistoryId: action.payload,
  };
};

const applyDeleteHistorySuccess = (state, action) => {
  return {
    ...state,
    deleteHistorySuccess: true,
  };
};

const applyDeleteHistoryFailure = (state, action) => {
  return {
    ...state,
    deleteHistoryError: action.error,
  };
};
const applyDeleteHistoryCleanup = (state, action) => {
  return {
    ...state,
    deleteHistorySuccess: false,
    deleteHistoryError: '',
    deleteHistoryId: '',
  };
};

export default reducer;
