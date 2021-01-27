import * as ActionTypes from './ActionTypes'

export const dishes = (state={
    dishes: [],
    recommend: [], 
    isLoading: true, 
    errMess: null
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_DISHES: {
            return {...state, dishes: action.payload, isLoading: false, errMess: null}
        }
        case ActionTypes.DISHES_LOADING: {
            return {...state, isLoading: true, errMess: null}
        }
        case ActionTypes.DISHES_FAILED: {
            return {...state,isLoading: false, errMess: action.payload}
        }
        case ActionTypes.FETCH_RECOMMEND: {
            return {...state, recommend: action.payload}
        }
        default: 
            return state
    }
}
