import { legacy_createStore as createStore, combineReducers} from 'redux'
import { compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';//! Always using for sync and Middleware. преобразует в функции
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const strMiddleware = ({dispatch, getState}) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action)
}

const enhancer = (createStore) => (...args) => {// if in store comes not object(str or function)
  const store = createStore(...args);

  const oldDispatch = store.dispatch;
  store.dispatch = (action) => {
    if (typeof action === 'string') {
      return oldDispatch({
        type: action
      })
    }
    return oldDispatch(action)
  }
  return store;
}
//! ДЛЯ комбинирвоания функций в Redux есть -- compose() так же важна последовательность first need enhancer (из-за строк)
const store = createStore(combineReducers({heroes, filters}),
                compose(applyMiddleware(ReduxThunk, strMiddleware),
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )
              );

export default store;