import * as ActionType from "./ActionTypes";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
});
