import * as ActionTypes from "./ActionTypes";
export const InitialFeedback = {
  firstname: "",
  lastname: "",
  telnum: "",
  email: "",
  agree: false,
  contactType: "Tel",
  message: "",
};

// reducer pour forms
export const Feedbacks = (
  state = { errMess: null, feedback: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      return {
        ...state,
        errMess: null,
        feedback: action.payload,
      };
    case ActionTypes.FEEDBACK_FAILED:
      return {
        ...state,
        errMess: action.payload,
      };
    case ActionTypes.ADD_FEEDBACKS:
      const feedback = action.payload;
      return {
        ...state,
        errMess: null,
        feedback: state.feedback.concat(feedback),
      };
    default:
      return state;
  }
};
