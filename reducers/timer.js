import moment from 'moment';

export const START_TIMER_AND_TODO_CREATE_REQUEST =
  'START_TIMER_AND_TODO_CREATE_REQUEST';
export const START_TIMER_AND_TODO_CREATE_SUCCESS =
  'START_TIMER_AND_TODO_CREATE_SUCCESS';
export const START_TIMER_AND_TODO_CREATE_FAILURE =
  'START_TIMER_AND_TODO_CREATE_FAILURE';

export const TODO_COMPLETE_REQUEST = 'TODO_COMPLETE_REQUEST';
export const TODO_COMPLETE_SUCCESS = 'TODO_COMPLETE_SUCCESS';
export const TODO_COMPLETE_FAILURE = 'TODO_COMPLETE_FAILURE';
export const TODO_COMPLETE_CLEANUP = 'TODO_COMPLETE_CLEANUP';

export const PAUSE_TIMER = 'PAUSE_TIMER';
export const RESUME_TIMER = 'RESUME_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const SET_TIMER = 'SET_TIMER';
export const ADD_SECOND = 'ADD_SECOND';

const DEFAULT_TIME = 25 * 60; // 25 minutes
const initialState = {
  totalTime: DEFAULT_TIME,
  elapsedTime: 0,
  isSetInterval: false,
  isStarted: false, // start -> complete
  isLoading: false, // start -> pause
  isRunning: false, // pause -> resume
  isSavingTodo: false, // todo 저장 시도 중
  isSaveTodoSuccess: false, // todo 저장 성공 여부
  todoCreateError: '',
  todoCompleteError: '',
  todoContent: '',
  doneContent: '',
  todoId: 0,
  timelineId: 0,
  startTime: '',
  elapsedTimeBackup: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER_AND_TODO_CREATE_REQUEST: {
      return applyStartTimerAndTodoCreateRequest(state, action);
    }
    case START_TIMER_AND_TODO_CREATE_SUCCESS: {
      return applyStartTimerAndTodoCreateSuccess(state, action);
    }
    case START_TIMER_AND_TODO_CREATE_FAILURE: {
      return applyStartTimerAndTodoCreateFailure(state, action);
    }
    case TODO_COMPLETE_REQUEST: {
      return applyTodoCompleteRequest(state, action);
    }
    case TODO_COMPLETE_SUCCESS: {
      return applyTodoCompleteSuccess(state, action);
    }
    case TODO_COMPLETE_FAILURE: {
      return applyTodoCompleteFailure(state, action);
    }
    case TODO_COMPLETE_CLEANUP: {
      return applyTodoCompleteCleanup(state, action);
    }
    case PAUSE_TIMER: {
      return {
        ...state,
        isRunning: false,
        elapsedTimeBackup: state.elapsedTime,
      };
    }
    case RESUME_TIMER: {
      return {
        ...state,
        isRunning: true,
        startTime: moment().local(),
      };
    }
    case RESET_TIMER: {
      return {
        ...state,
        elapsedTime: 0,
        elapsedTimeBackup: 0,
        isStarted: false,
        isLoading: false,
        isRunning: false,
      };
    }
    case SET_TIMER: {
      return {
        ...state,
        isRunning: false,
        elapsedTime: 0,
        elapsedTimeBackup: 0,
        totalTime: action.time,
      };
    }
    case ADD_SECOND: {
      if (state.elapsedTime < state.totalTime) {
        return {
          ...state,
          elapsedTime:
            parseInt(
              moment.duration(moment().local() - state.startTime).asSeconds(),
              10,
            ) + state.elapsedTimeBackup,
        };
      } else {
        return {
          ...state,
          isRunning: false,
        };
      }
    }
    default: {
      return state;
    }
  }
};

const applyStartTimerAndTodoCreateRequest = (state, action) => {
  return {
    ...state,
    isStarted: false,
    isLoading: true,
    isRunning: false,
  };
};

const applyStartTimerAndTodoCreateSuccess = (state, action) => {
  return {
    ...state,
    isStarted: true,
    isLoading: false,
    isRunning: true,
    todoId: action.payload.todoId,
    timelineId: action.payload.timelineId,
    startTime: moment().local(),
  };
};

const applyStartTimerAndTodoCreateFailure = (state, action) => {
  return {
    ...state,
    isStarted: false,
    isLoading: false,
    isRunning: false,
    todoCreateError: action.error,
  };
};

const applyTodoCompleteRequest = (state, action) => {
  return {
    ...state,
    isRunning: false,
    isSavingTodo: true,
    isSaveTodoSuccess: false,
    todoCompleteError: '',
  };
};

const applyTodoCompleteSuccess = (state, action) => {
  return {
    ...state,
    elapsedTime: 0,
    elapsedTimeBackup: 0,
    isStarted: false,
    isLoading: false,
    isSavingTodo: false,
    isSaveTodoSuccess: true,
  };
};

const applyTodoCompleteFailure = (state, action) => {
  return {
    ...state,
    elapsedTime: 0,
    elapsedTimeBackup: 0,
    isStarted: false,
    isLoading: false,
    isSavingTodo: false,
    isSaveTodoSuccess: false,
    todoCompleteError: action.error,
  };
};

const applyTodoCompleteCleanup = (state, action) => {
  return {
    ...state,
    isSavingTodo: false,
    isSaveTodoSuccess: false,
  };
};

export default reducer;
