import * as ActionType from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((response) => dispatch(addComment(response)))
    .catch((error) => console.log("Post comments", error));
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((dishes) => {
      return dispatch(addDishes(dishes));
    })
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionType.DISHES_LOADING,
});

export const dishesFailed = (err) => ({
  type: ActionType.DISHES_FAILED,
  payload: err,
});

export const addDishes = (dishes) => ({
  type: ActionType.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  // dispatch(dishesLoading(true));

  return fetch(baseUrl + "comments")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(
            "error : " + res.status + ": " + res.statusText
          );
          error.response = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((comments) => {
      return dispatch(addComments(comments));
    })
    .catch((err) => {
      dispatch(commentsFailed(err));
    });
};

export const commentsFailed = (errmess) => ({
  type: ActionType.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionType.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(
            "error : " + res.status + ": " + res.statusText
          );
          error.response = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((promos) => {
      return dispatch(addPromos(promos));
    })
    .catch((err) => {
      dispatch(promosFailed(err));
    });
};

export const promosLoading = () => ({
  type: ActionType.PROMOS_LOADING,
});

export const promosFailed = (err) => ({
  type: ActionType.PROMOS_FAILED,
  payload: err,
});

export const addPromos = (promos) => ({
  type: ActionType.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leaderLoading());

  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
      
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "error : " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((leader) => {
      return dispatch(addLeader(leader));
    })
    .catch((err) => {
      dispatch(leaderFailed(err));
    });
};

export const addLeader = (leader) => ({
  type: ActionType.ADD_LEADER,
  payload: leader,
});

export const leaderLoading = () => ({
  type: ActionType.LEADER_LOADING,
});

export const leaderFailed = (errMess) => ({
  type: ActionType.LEADER_FAILED,
  payload: errMess
});
