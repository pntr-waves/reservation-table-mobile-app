import {TablesUrl, UserUrl, LoginUrl, baseUrl, DishesUrl} from '../shared/baseUrl';
import axios from 'axios';
import * as ActionTypes from './ActionTypes';

//action for Dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return axios.get(DishesUrl)
  .then(res => {
    if(res.status === 200){
      dispatch(addDishes(res.data))
    }else{
      dispatch(dishesFailed(res.statusText))
    }
  })
  .catch(error => {
    dispatch(dishesFailed(error))
  })
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
  dispatch(loadingUser());

  return axios
    .post(LoginUrl, {
      email: email,
      password: password,
    })
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
    .catch((error) => dispatch(failedUser(error)));
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

export const postBill = (dish, amount) => {
  var arrBill = [
    {
      billId: Math.random() * (1000 - 20) + 20,
      dish,
      amount,
    },
  ];
  return {
    type: ActionTypes.POST_BILL,
    payload: arrBill,
  };
};

export const updateBill = (dish, amount) => {
  let bill = {dish, amount};
  return {
    type: ActionTypes.UPDATE_BILL,
    payload: bill,
  };
};

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
  return{
    type: ActionTypes.SEARCH_TABLE,
    payload: text
  }
}

export const fetchAllUser = () => (dispatch) => {
  return axios.get(UserUrl)
  .then(res => dispatch({
    type: ActionTypes.FETCH_ALL_USER,
    payload: res.data
  }))
  .then(error => console.log(error))
}
