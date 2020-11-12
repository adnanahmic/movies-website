import { put, takeLatest, all, call } from "redux-saga/effects";
import { setGenres, setMoviesList } from "../actions";
import {
  getGenresApi,
  getMoviesApi,
  searchMoviesApi,
  sortMoviesApi,
} from "../api";

function* fetchGenres() {
  const response = yield call(getGenresApi);
  if (response.status === 200) yield put(setGenres(response.data));
}

function* fetchMovies(action) {
  const response = yield call(getMoviesApi, action.payload);

  if (response.status === 200) yield put(setMoviesList(response.data));
}

function* searchMovies(action) {
  const response = yield call(searchMoviesApi, action.payload);
  if (response.status === 200) yield put(setMoviesList(response.data));
}

function* sortMovies(action) {
  const response = yield call(sortMoviesApi, action.payload);
  if (response.status === 200) yield put(setMoviesList(response.data));
}

export default function* rootSaga() {
  yield all([
    yield takeLatest("GET_MOVIES", fetchMovies),
    yield takeLatest("GET_GENRES", fetchGenres),
    yield takeLatest("SEARCH_MOVIES", searchMovies),
    yield takeLatest("SORT_MOVIES", sortMovies),
  ]);
}
