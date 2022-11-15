import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async () => {
    const {request} = useHttp();
    return await request('http://localhost:3001/heroes')
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    /* heroesFetching: state => {state.heroesLoadingStatus = 'loading'}, //! нельзя в одну string because of return
    heroesFetched: (state, action) => { //don't needed because it down
      state.heroesLoadingStatus = 'idle'
      state.heroes = action.payload
      },
    heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},  */
    heroCreated: (state, action) => {heroesAdapter.addOne(state, action.payload)},
    heroDeleted: (state, action) => {heroesAdapter.removeOne(state, action.payload)}
  },
  extraReducers: (build) => {
    build
      .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle'
        heroesAdapter.setAll(state, action.payload)
        //state.heroes = action.payload // standard 
      })
      .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
      .addDefaultCase(() => {})
  }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} = actions;

