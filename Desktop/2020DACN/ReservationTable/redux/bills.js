import * as ActionTypes from './ActionTypes';

export const bills = (
  state = {
    bill: [],
    errMess: null,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.POST_BILL: {
      return {...state, bill: state.bill.concat(action.payload), errMess: null};
    }
    case ActionTypes.UPDATE_BILL: {
      return {
        ...state,
        bill: state.bill.map((el) => {
          if (action.payload.dish.id === el.dish.id) {
            let oldAmount = parseInt(el.amount);
            let newAmount = parseInt(action.payload.amount);

            el.amount = (oldAmount + newAmount).toString();
          }
          return el;
        }),
        errMess: null,
      };
    }
    default: {
      return state;
    }
  }
};
