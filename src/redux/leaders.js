import * as ActionType from "./ActionTypes";

export const Leaders = (
  state = { isLoading: true, errMess: null, leader: [] },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_LEADER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leader: action.payload,
      };

    case ActionType.LEADER_LOADING:
      return { ...state, isLoading: true, errMess: null };

    case ActionType.LEADER_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
