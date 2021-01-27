import {
  TablesUrl,
  UserUrl,
  LoginUrl,
  DishesUrl,
  CommentsUrl,
  FavoriteUrl,
  RecommendUrl,
  CartUrl,
  GetCartUrl,
} from '../shared/baseUrl';
import axios from 'axios';
import * as ActionTypes from './ActionTypes';

//action for Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return axios
    .get(DishesUrl)
    .then((res) => {
      if (res.status === 200) {
        dispatch(addDishes(res.data));
      } else {
        dispatch(dishesFailed(res.statusText));
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatch(dishesFailed(error.response.data));
        dispatch(dishesFailed(error.response.status));
        dispatch(dishesFailed(error.response.headers));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        dispatch(dishesFailed(error.request));
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch(dishesFailed(('Error', error.message)));
      }
      dispatch(dishesFailed(error.config));
    });
};

export const fetchRecommend = (userId) => (dispatch) => {
  return axios
    .post(RecommendUrl + userId)
    .then((res) => dispatch(addRecommend(res.data)))
    .catch((error) => {
      console.log(error);
    });
};

export const addRecommend = (dishes) => ({
  type: ActionTypes.FETCH_RECOMMEND,
  payload: dishes,
});

export const postToCart = (userId, dishId) => {
  return axios.post(CartUrl + userId, {dishesId: dishId});
};
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchUsers = (email, password) => (dispatch) => {
  dispatch(loadingUser);
  const headers = {headers: {'Content-Type': 'application/json'}};
  return axios
    .post(
      LoginUrl,
      {
        email: email,
        password: password,
      },
      headers,
    )
    .then((res) => {
      if (res.data.success === 1) {
        dispatch(
          addUser({
            id: res.data.user[0]._id,
            ...res.data.user[0].local,
          }),
        );
      } else if (res.data.success === 0) {
        dispatch(failedUser('Không tìm thấy tài khoản'));
      } else {
        dispatch(failedUser('Sai Password'));
      }
    })
    .catch((error) => {
      dispatch(failedUser(error));
      console.log('TODO: Handle error axios', err);
    });
};

export const loadingUser = () => {
  return {
    type: ActionTypes.LOADING_USER,
  };
};

export const failedUser = (errMess) => ({
  type: ActionTypes.FAILED_USER,
  payload: errMess,
});

export const addUser = (user) => ({
  type: ActionTypes.FETCH_USER,
  payload: user,
});

export const addTables = (tables) => {
  return {
    type: ActionTypes.FETCH_TABLE,
    payload: tables,
  };
};
//fetch tables from heroku
export const fetchTables = () => (dispatch) => {
  dispatch(loadingTables);

  return axios
    .get(TablesUrl)
    .then((res) => {
      if (res.status === 200) {
        dispatch(addTables(res.data));
      } else {
        dispatch(errorTables(res.statusText));
      }
    })
    .catch((error) => {
      dispatch(errorTables(error));
    });
};
export const loadingTables = () => {
  return {
    type: ActionTypes.TABLE_LOADING,
  };
};

export const errorTables = (error) => {
  return {
    type: ActionTypes.ERROR_TABLE,
    payload: error,
  };
};

export const searchTables = (text) => {
  return {
    type: ActionTypes.SEARCH_TABLE,
    payload: text,
  };
};

export const fetchAllUser = () => (dispatch) => {
  return axios
    .get(UserUrl)
    .then((res) =>
      dispatch({
        type: ActionTypes.FETCH_ALL_USER,
        payload: res.data,
      }),
    )
    .then((error) => console.log(error));
};
//comments
export const fetchComments = () => (dispatch) => {
  dispatch(commentsLoading());

  return axios
    .get(CommentsUrl)
    .then((res) => {
      if (res.status === 200) {
        dispatch(addComments(res.data));
      } else {
        dispatch(commentsFailed(res.statusText));
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatch(commentsFailed(error.response.data));
        dispatch(commentsFailed(error.response.status));
        dispatch(commentsFailed(error.response.headers));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        dispatch(commentsFailed(error.request));
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch(commentsFailed(('Error', error.message)));
      }
      dispatch(commentsFailed(error.config));
    });
};

export const commentsLoading = () => ({
  type: ActionTypes.LOADING_COMMENTS,
});

export const commentsFailed = (errmess) => ({
  type: ActionTypes.FAILED_COMMENTS,
  payload: errmess,
});

export const addComments = (dishes) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: dishes,
});

export const postComment = (dishId, rating, comment, name) => {
  var newComment = {
    dishId,
    rating,
    comment,
    name,
  };
  return {
    type: ActionTypes.POST_COMMENT,
    payload: newComment,
  };
};

//favorites
export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading());

  return axios
    .get(FavoriteUrl)
    .then((res) => {
      if (res.status === 200) {
        dispatch(addFavorites(res.data));
      } else {
        dispatch(favoritesFailed(res.statusText));
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatch(favoritesFailed(error.response.data));
        dispatch(favoritesFailed(error.response.status));
        dispatch(favoritesFailed(error.response.headers));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        dispatch(favoritesFailed(error.request));
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch(favoritesFailed(('Error', error.message)));
      }
      dispatch(favoritesFailed(error.config));
    });
};

export const favoritesLoading = () => ({
  type: ActionTypes.LOADING_FAVORITES,
});

export const favoritesFailed = (errmess) => ({
  type: ActionTypes.FAILED_FAVORITES,
  payload: errmess,
});

export const addFavorites = (dishes) => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: dishes,
});

export const addLocalFavorites = (dishes) => ({
  type: ActionTypes.ADD_LOCAL_FAVORITES,
  payload: dishes,
});

export const deleteFavorite = (dish) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dish,
});

export const addFavorite = (dish) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dish,
});

//bills
export const fetchBills = (userId) => (dispatch) => {
  dispatch(billsLoading());

  return axios
    .get(`${GetCartUrl}${userId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(addBills(res.data));
      } else {
        dispatch(failedBills(res.statusText));
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        dispatch(failedBills(error.response.data));
        dispatch(failedBills(error.response.status));
        dispatch(failedBills(error.response.headers));
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        dispatch(failedBills(error.request));
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch(failedBills(('Error', error.message)));
      }
      dispatch(failedBills(error.config));
    });
};

export const billsLoading = () => ({
  type: ActionTypes.LOADING_BILLS,
});

export const failedBills = (errmess) => ({
  type: ActionTypes.FAILED_BILLS,
  payload: errmess,
});

export const addBills = (dishes) => ({
  type: ActionTypes.ADD_BILLS,
  payload: dishes,
});

export const deleteBill = (dish) => ({
  type: ActionTypes.DELETE_BILL,
  payload: dish,
});

export const addBill = (dish) => ({
  type: ActionTypes.ADD_BILL,
  payload: dish,
});
