import * as ActionTypes from './ActionTypes';

export const users = (
  state = {
    users: [],
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_USER: {
      return {
        ...state,
        users: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
