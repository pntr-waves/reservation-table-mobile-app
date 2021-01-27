import * as ActionTypes from './ActionTypes';

export const favorites = (
  state = {
    favorites: [],
    localFavorites: [],
    errMess: null,
    isLoading: false,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITES: {
      return {
        ...state,
        favorites: action.payload,
        errMess: null,
        isLoading: false,
      };
    }
    case ActionTypes.LOADING_FAVORITES: {
      return {...state, errMess: null, isLoading: true};
    }
    case ActionTypes.FAILED_FAVORITES: {
      return {
        ...state,
        errMess: action.payload,
        isLoading: false,
      };
    }
    case ActionTypes.ADD_LOCAL_FAVORITES: {
      return {
        ...state,
        localFavorites: action.payload,
      };
    }
    case ActionTypes.DELETE_FAVORITE: {
      return {
        ...state,
        localFavorites: state.localFavorites.filter(
          (favorite) => favorite !== action.payload,
        ),
      };
    }
    case ActionTypes.ADD_FAVORITE: {
      if(state.localFavorites.includes(action.payload) === false){
        state.localFavorites.push(action.payload);
      }
      return {
        ...state,
        localFavorites: state.localFavorites,
      };
    }
    default: {
      return state;
    }
  }
};
