import { legacy_createStore as createStore, combineReducers} from 'redux'
import { compose, applyMiddleware } from 'redux'; //! ДЛЯ комбинирвоания функций в Redux - compose()
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';//! Always using for sync and Middleware. преобразует в функции
import heroes from '../components/heroesList/HeroesSlice';
import filters from '../components/heroesFilters/FiltersSlice'
//import filters from '../reducers/filters';

const strMiddleware = ({dispatch, getState}) => (next) => (action) => {//it personal middleware
  if (typeof action === 'string') { return next({ type: action }) }
  return next(action)
}

//! ДЛЯ комбинирвоания функций в Redux есть -- compose() так же важна последовательность first need enhancer (из-за строк)
// const store = createStore(combineReducers({heroes, filters}),
//                 compose(applyMiddleware(ReduxThunk, strMiddleware),
//                   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                 )
//               );

const store = configureStore({
  reducer: {heroes, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(strMiddleware), // получаем 3 стандартных middleware и соединяем с лично созданым
  devTools: process.env.NODE_ENV !== 'production', //for чтобы toolkit можно use only in development
  
});

export default store;