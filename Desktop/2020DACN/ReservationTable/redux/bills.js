import * as ActionTypes from './ActionTypes';

export const bills = (
  state = {
    bills: [],
    local_bills: [],
    errMess: null,
    isLoading: false,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.ADD_BILLS: {
      return {
        ...state,
        bills: action.payload,
        local_bills: action.payload,
        errMess: null,
        isLoading: false,
      };
    }
    case ActionTypes.LOADING_BILLS: {
      return {...state, errMess: null, isLoading: true};
    }
    case ActionTypes.FAILED_BILLS: {
      return {
        ...state,
        errMess: action.payload,
        isLoading: false,
      };
    }
    case ActionTypes.DELETE_BILL: {
      return {
        ...state,
        local_bills: state.local_bills.filter(
          (bill) => bill !== action.payload,
        ),
      };
    }
    case ActionTypes.ADD_BILL: {
      if(state.local_bills.includes(action.payload) === false){
        state.local_bills.push(action.payload);
      }
      return {
        ...state,
        local_bills: state.local_bills,
      };
    }
    default: {
      return state;
    }
  }
};
