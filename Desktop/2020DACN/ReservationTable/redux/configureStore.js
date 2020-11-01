import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {dishes} from './dishes'

export const ConfigureStore = ()=>{
    const store = createStore(
        combineReducers({
            dishes,
        }),
        applyMiddleware(thunk, logger)
    )

    return store
}