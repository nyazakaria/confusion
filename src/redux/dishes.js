import * as ActionType from "./ActionTypes";



export const Dishes = (state = {
  isLoading: true,
  err: null, 
  dishes: []
}, action) => {
  switch (action.type) {
    case ActionType.ADD_DISHES:
      return {...state, isLoading: false, err: null, dishes: action.payload}
    case ActionType.DISHES_LOADING:
      return {...state, isLoading: true, err: null, dishes: []}

    case ActionType.DISHES_FAILED:
      return {...state, isLoading: false, err: action.payload, dishes: []}
    
    default:
      return state;
  }
};
