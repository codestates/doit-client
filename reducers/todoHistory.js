// ACTION
export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

// INITIAL
const initialState = {
  todos: [],
};

const blankData = [
  {
    id: 0,
    todoContent: '',
    doneContent: null,
    duration: 0,
    isComplete: false,
    timelines: [
      {
        id: 0,
        startedAt: 'Doit 데이터가 없는 날이네요! (◕‿◕✿)',
        endedAt: null,
      },
    ],
  },
];

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS_REQUEST: {
      return {
        ...state,
        todos: blankData,
      };
    }
    case LOAD_TODOS_SUCCESS: {
      console.log(action.data);
      return {
        ...state,
        todos: action.data.length === 0 ? blankData : action.data,
      };
    }
    case LOAD_TODOS_FAILURE: {
      return {
        ...state,
        todos: blankData,
      };
    }
    default: {
      return state;
    }
  }
};

// history 화면을 열면 당일 날짜로 데이터를 불러와 화면에 출력한다. - PICK_DATE(today)
// history 화면에서 해당 일자를 클릭하면 해당 일자의 데이터를 서버에 요청하여 화면에 출력

export default reducer;
