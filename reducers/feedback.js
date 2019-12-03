export const FEEDBACK_REQUEST = 'FEEDBACK_REQUEST';
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS';
export const FEEDBACK_FAILURE = 'FEEDBACK_FAILURE';
export const FEEDBACK_RESET = 'FEEDBACK_RESET';

const initialState = {
  isSubmitting: false,
  content: '',
  isSubmitted: false,
  submitError: '',
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return {
        ...state,
        content: action.payload,
        isSubmitting: true,
        isSubmitted: false,
      };
    case FEEDBACK_SUCCESS:
      return {
        content: '',
        isSubmitting: false,
        isSubmitted: true,
        submitError: '',
      };
    case FEEDBACK_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
        isSubmitted: false,
      };
    case FEEDBACK_RESET:
      return {
        isSubmitting: false,
        content: '',
        isSubmitted: false,
        submitError: '',
      };
    default:
      return state;
  }
};

export default feedbackReducer;
