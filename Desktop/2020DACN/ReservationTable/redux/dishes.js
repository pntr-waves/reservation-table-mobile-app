import * as ActionTypes from './ActionTypes'

export const dishes = (state={
    dishes: [],
    isLoading: true, 
    errMess: null
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_DISHES: {
            return {...state, dishes: action.payload, isLoading: false, errMess: null}
        }
        case ActionTypes.DISHES_LOADING: {
            return {...state, dishes: [], isLoading: true, errMess: null}
        }
        case ActionTypes.DISHES_FAILED: {
            return {...state, dishes: [], isLoading: false, errMess: action.payload}
        }
        default: 
            return state
    }
}
