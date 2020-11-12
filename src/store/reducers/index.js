import {
  SET_FILTERS,
  SET_SEARCH,
  GET_MOVIES,
  SEARCH_MOVIES,
  SET_GENRES,
  SET_MOVIES,
  SORT_MOVIES,
} from "../actions/constants";

const initialState = {
  genres: [],
  movies: [],
  loading: false,
  filters: false,
  search: false,
  total: 0,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_GENRES:
      return { ...state, genres: payload.genres };
    case GET_MOVIES:
      return { ...state, loading: true };
    case SEARCH_MOVIES:
      return {
        ...state,
        loading: true,
        search: true,
        movies: payload.page > 1 ? state.movies : [],
      };
    case SORT_MOVIES:
      return {
        ...state,
        loading: true,
        filters: true,
        movies: payload.page > 1 ? state.movies : [],
      };
    case SET_MOVIES:
      return {
        ...state,
        loading: false,
        movies: [...state.movies, ...payload.results],
        total: payload.total_results,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: payload,
        movies: payload ? [] : state.movies,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: payload,
        movies: state.search && !payload ? [] : state.movies,
      };
    default:
      return state;
  }
};

export default rootReducer;
