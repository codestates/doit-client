// ACTION
export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

// INITIAL
const initialState = {
  date: '',
  todos: [],
  todosCount: [],
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS_REQUEST: {
      return {
        ...state,
        date: action.data.date,
        todos: [],
      };
    }
    case LOAD_TODOS_SUCCESS: {
      return {
        ...state,
        todos: action.data.todos.length === 0 ? [] : action.data.todos,
        todosCount:
          action.data.todosCount.length === 0 ? [] : action.data.todosCount,
      };
    }
    case LOAD_TODOS_FAILURE: {
      return {
        ...state,
        todos: [],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
