import {
  GET_GENRES,
  SET_GENRES,
  GET_MOVIES,
  SET_MOVIES,
  SEARCH_MOVIES,
  SORT_MOVIES,
  SET_FILTERS,
  SET_SEARCH,
} from "./constants";

export const getGenres = () => {
  return {
    type: GET_GENRES,
    payload: null,
  };
};

export const setGenres = (data) => {
  return {
    type: SET_GENRES,
    payload: data,
  };
};

export const getMoviesList = (page) => {
  return {
    type: GET_MOVIES,
    payload: page,
  };
};

export const setMoviesList = (data) => {
  return {
    type: SET_MOVIES,
    payload: data,
  };
};

export const searchMovies = (data) => {
  return {
    type: SEARCH_MOVIES,
    payload: data,
  };
};

export const setFilters = (data) => {
  return {
    type: SET_FILTERS,
    payload: data,
  };
};

export const setSearch = (data) => {
  return {
    type: SET_SEARCH,
    payload: data,
  };
};

export const sortMovies = (data) => {
  return {
    type: SORT_MOVIES,
    payload: data,
  };
};
