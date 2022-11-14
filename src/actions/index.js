// import { createAction } from "@reduxjs/toolkit";
// import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/HeroesSlice';
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/FiltersSlice';

//! don't needed. Used other version in heroesSlice (fetchHeroes)
// export const fetchHeroes = (request) => (dispatch) => { 
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }
export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching())
    request(`http://localhost:3001/filters`)
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

/* // export const heroesFetching = () => { //!because of HeroesSlice don't need it anymore
//     return { type: 'HEROES_FETCHING' }
// }
export const heroesFetching = createAction('HEROES_FETCHING'); // 1 надо передовать str.  2 if need it can be a function

// export const heroesFetched = (heroes) => {
//     return { type: 'HEROES_FETCHED',
//              payload: heroes }
// }
export const heroesFetched = createAction('HEROES_FETCHED'); // works because heroes автаматический переходят в payload

// export const heroesFetchingError = () => {
//     return { type: 'HEROES_FETCHING_ERROR' }
// }
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }
export const heroDeleted = createAction('HERO_DELETED'); // payload автоматический adding

// export const heroCreated = (hero) => {
//     return {
//         type: "HERO_CREATED",
//         payload: hero
//     }
// }
export const heroCreated = createAction("HERO_CREATED"); */

/* export const filtersFetching = () => {
    return {
        type: "FILTERS_FETCHING"
    }
}
export const filtersFetched = (filters) => {
    return {
        type: "FILTERS_FETCHED",
        payload: filters
    }
}
export const filtersFetchingError = () => {
    return {
        type: "FILTERS_FETCHING_ERROR"
    }
}
export const activeFilterChanged = (filter) => {
    return {
        type: "ACTIVE_FILTER_CHANGED",
        payload: filter
    }
} */
// export const activeFilterChanged = (filter) => (dispatch) => { // for откладывания показа и тп действий
//     setTimeout(() => {
//         dispatch({
//             type: "ACTIVE_FILTER_CHANGED",
//             payload: filter 
//         })
//     }, 1000)
// }