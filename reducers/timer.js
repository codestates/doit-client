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

export const FOCUS_ON_TODOCONTENT = 'FOCUS_ON_TODOCONTENT';
export const SAVE_TODOCONTENT = 'SAVE_TODOCONTENT';

export const TODO_PAUSE_REQUEST = 'TODO_PAUSE_REQUEST';
export const TODO_PAUSE_SUCCESS = 'TODO_PAUSE_SUCCESS';
export const TODO_PAUSE_FAILURE = 'TODO_PAUSE_FAILURE';
export const TODO_PAUSE_CLEANUP = 'TODO_PAUSE_CLEANUP';

export const TODO_RESUME_REQUEST = 'TODO_RESUME_REQUEST';
export const TODO_RESUME_SUCCESS = 'TODO_RESUME_SUCCESS';
export const TODO_RESUME_FAILURE = 'TODO_RESUME_FAILURE';
export const TODO_RESUME_CLEANUP = 'TODO_RESUME_CLEANUP';

export const RESET_TIMER = 'RESET_TIMER';

export const SET_TIMER = 'SET_TIMER';
export const ADD_SECOND = 'ADD_SECOND';
export const TOGGLE_SOUND_ON_OFF = 'TOGGLE_SOUND_ON_OFF';

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
  todoPauseError: '',
  todoResumeError: '',
  focusOnTodoContent: false,
  savedTodoContent: '',
  todoId: 0,
  timelineId: 0,
  startTime: '',
  elapsedTimeBackup: 0,
  isSoundOn: true,
  isReseted: false,
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
    case FOCUS_ON_TODOCONTENT: {
      return applyFocusOnTodocontent(state, action);
    }
    case SAVE_TODOCONTENT: {
      return applyCheckTodoExist(state, action)
    }
    case TODO_PAUSE_REQUEST: {
      return applyTodoPauseRequest(state, action);
    }
    case TODO_PAUSE_SUCCESS: {
      return applyTodoPauseSuccess(state, action);
    }
    case TODO_PAUSE_FAILURE: {
      return applyTodoPauseFailure(state, action);
    }
    case TODO_COMPLETE_CLEANUP: {
      return applyTodoPauseCleanup(state, action);
    }
    case TODO_RESUME_REQUEST: {
      return applyTodoResumeRequest(state, action);
    }
    case TODO_RESUME_SUCCESS: {
      return applyTodoResumeSuccess(state, action);
    }
    case TODO_RESUME_FAILURE: {
      return applyTodoResumeFailure(state, action);
    }
    case TODO_RESUME_CLEANUP: {
      return applyTodoResumeCleanup(state, action);
    }

    case RESET_TIMER: {
      return applyResetTimer(state, action);
    }
    case SET_TIMER: {
      return applySetTimer(state, action);
    }
    case ADD_SECOND: {
      return applyAddSecond(state, action);
    }
    case TOGGLE_SOUND_ON_OFF: {
      return applyToggleSoundOnOff(state, action);
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
    todoContnet: '',
    doneContent: '',
  };
};

const applyFocusOnTodocontent = (state, action) => {
  return {
    ...state, 
    focusOnTodoContent: !state.focusOnTodoContent
  }
}

const applyCheckTodoExist = (state, action) => {
  return {
    ...state, 
    savedTodoContent: action.payload
  }
}

const applyTodoPauseRequest = (state, action) => {
  return {
    ...state,
    isRunning: false,
  };
};

const applyTodoPauseSuccess = (state, action) => {
  return {
    ...state,
    elapsedTimeBackup: state.elapsedTime,
  };
};

const applyTodoPauseFailure = (state, action) => {
  return {
    ...state,
    isRunning: true,
    elapsedTimeBackup: 0,
    todoPauseError: action.error,
  };
};

const applyTodoPauseCleanup = (state, action) => {
  return {
    ...state,
    todoPauseError: '',
  };
};

const applyTodoResumeRequest = (state, action) => {
  return {
    ...state,
    isRunning: true,
  };
};

const applyTodoResumeSuccess = (state, action) => {
  return {
    ...state,
    startTime: moment().local(),
    timelineId: action.payload.timelineId,
  };
};

const applyTodoResumeFailure = (state, action) => {
  return {
    ...state,
    isRunning: false,
    todoResumeError: action.error,
  };
};

const applyTodoResumeCleanup = (state, action) => {
  return {
    ...state,
    todoResumeError: '',
  };
};

const applyResetTimer = (state, action) => {
  return {
    ...state,
    elapsedTime: 0,
    elapsedTimeBackup: 0,
    isStarted: false,
    isLoading: false,
    isRunning: false,
    todoContent: '',
    doneContent: '',
    isReseted: true,
  };
};

const applySetTimer = (state, action) => {
  return {
    ...state,
    isRunning: false,
    elapsedTime: 0,
    elapsedTimeBackup: 0,
    totalTime: action.time,
  };
};

const applyAddSecond = (state, action) => {
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
      elapsedTime: state.totalTime,
    };
  }
};

const applyToggleSoundOnOff = (state, action) => {
  return {
    ...state,
    isSoundOn: action.data,
  };
};

export default reducer;
