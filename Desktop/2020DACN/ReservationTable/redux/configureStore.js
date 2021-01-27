import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {user} from './user';
import {bills} from './bills';
import {tables} from './tables';
import {users} from './users';
import {comments} from './comments';
import {favorites} from './favorites';
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes,
      user,
      bills,
      tables,
      users,
      comments,
      favorites,
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
};
