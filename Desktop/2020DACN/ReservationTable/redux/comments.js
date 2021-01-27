import * as ActionTypes from './ActionTypes';

export const comments = (
  state = {
    comments: [],
    errMess: null,
    isLoading: false,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
        errMess: null,
        isLoading: false,
      };
    }
    case ActionTypes.POST_COMMENT: {
      state.comments.push(action.payload)
      return{
        ...state,
        comments: state.comments
      }
    }
    case ActionTypes.LOADING_COMMENTS: {
      return {...state, errMess: null, isLoading: true};
    }
    case ActionTypes.FAILED_COMMENTS: {
      return {
        ...state,
        errMess: action.payload,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
