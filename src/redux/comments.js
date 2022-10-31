import * as ActionTypes from './ActionTypes';
import { COMMENTS } from "../shared/comments";

// action dispatch 

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT: 
        const comment = action.payload;
        comment.id = state.length;
        comment.date = new Date().toISOString();
        console.log(comment.id, "comment")
        return state.concat(comment);
    default:
      return state;
  }
};
