import * as ActionTypes from './ActionTypes'

export const dishes = (state={
    dishes: [],
    isLoading: false, 
    errMess: null
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_DISHES: {
            return {...state, dishes: action.payload, isLoading: false, errMess: null}
        }
        case ActionTypes.DISHES_LOADING: {
            return {...state, dishes: [], isLoading: true, errMess: null}
        }
        default: 
            return state
    }
}
