import * as ActionTypes from './ActionTypes';

export const user = (
  state = {
    user: null,
    errorMess: null,
    isLoading: true,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
      return {
        ...state,
        user: action.payload,
        errorMess: null,
        isLoading: false,
      };
    }
    case ActionTypes.FAILED_USER: {
      return {...state, user: null, errorMess: action.payload, isLoading: false};
    }
    case ActionTypes.LOADING_USER: {
      return {...state, user: null, errorMess: null, isLoading: true};
    }
    default: {
      return state;
    }
  }
};
