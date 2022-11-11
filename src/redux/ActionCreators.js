import * as ActionType from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then((res) => {
      return res.json();
    })
    .then((dishes) => {
      return dispatch(addDishes(dishes));
    });
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
    .then((res) => {
      return res.json();
    })
    .then((comments) => {
      return dispatch(addComments(comments));
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
    .then((res) => {
      return res.json();
    })
    .then((promos) => {
      return dispatch(addPromos(promos));
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
