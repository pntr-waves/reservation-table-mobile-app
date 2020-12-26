import * as ActionTypes from './ActionTypes';

export const tables = (
  state = {
    tables: [],
    subTables: [],
    errMess: null,
    isLoading: false,
  },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_TABLE: {
      return {
        ...state,
        tables: action.payload,
        subTables: action.payload,
        errMess: null,
        isLoading: false,
      };
    }
    case ActionTypes.TABLE_LOADING: {
      return {...state, errMess: null, isLoading: true};
    }
    case ActionTypes.ERROR_TABLE: {
      return {
        ...state,
        errMess: action.payload,
        isLoading: false,
        subTables: [],
      };
    }
    case ActionTypes.SEARCH_TABLE: {
      if(action.payload === ""){
        return {...state, subTables: state.tables}
      }else{
        return {...state, subTables: state.subTables.filter(table => {
          return table.name.indexOf(action.payload) !== -1
        })};
      }
    }
    default: {
      return state;
    }
  }
};
