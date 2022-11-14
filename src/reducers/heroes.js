import { createReducer } from "@reduxjs/toolkit";

/* import { //!don't using anymore because of functional in heroesSlice.js
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, { // Don't work in TypeScript
    [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'}, //! нельзя в одну string because of return
    [heroesFetched]: (state, action) => {
                    state.heroesLoadingStatus = 'idle'
                    state.heroes = action.payload
                    },
    [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'}, 
    [heroCreated]: (state, action) => {state.heroes.push(action.payload)},
    [heroDeleted]: (state, action) => {
        state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    },
    [],
    state => state                
); */

// const heroes = createReducer(initialState, builder => {// action creaters доожны быть создаын при помощи createAction
//     builder
//         .addCase(heroesFetching, state => {//! if use return то библиотека не работает и нужно соблюдать иимутабильность. Если без return То из-за toolkit and createReducer создаётся иимутабильность 
//             state.heroesLoadingStatus = 'loading';
//             // return { // if use return using иммутабильность
//             //     ...state,
//             //     heroesLoadingStatus: 'loading'
//             // }
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error'
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         })
//         .addDefaultCase(() => {});
// })

// const heroes = (state = initialState, action) => { //standard. without libraries
//   switch (action.type) {
//       case 'HEROES_FETCHING':
//           return {
//               ...state,
//               heroesLoadingStatus: 'loading'
//           }
//       case 'HEROES_FETCHED':
//           return {
//               ...state,
//               heroes: action.payload,
//               heroesLoadingStatus: 'idle'
//           }
//       case 'HEROES_FETCHING_ERROR':
//           return {
//               ...state,
//               heroesLoadingStatus: 'error'
//           }
//       case "HERO_CREATED":
//           return {
//               ...state,
//               heroes: [...state.heroes, action.payload]
//           }
//       case 'HERO_DELETED': 
//           return {
//               ...state,
//               heroes: state.heroes.filter(item => item.id !== action.payload)
//           }      
//       default: return state
//   }
// }

export default heroes;