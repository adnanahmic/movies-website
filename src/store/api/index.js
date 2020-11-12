import Axios from "axios";

const { REACT_APP_API_KEY, REACT_APP_API_URL } = process.env;

export const getGenresApi = () => {
  return Axios.get(
    `${REACT_APP_API_URL}/genre/movie/list?api_key=${REACT_APP_API_KEY}&language=en-US`
  );
};

export const getMoviesApi = (page) => {
  return Axios.get(
    `${REACT_APP_API_URL}/movie/popular?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}`
  );
};

export const searchMoviesApi = ({ searchText, page }) => {
  return Axios.get(
    `${REACT_APP_API_URL}/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}`
  );
};

export const sortMoviesApi = ({ filters, page }) => {
  let query = Object.keys(filters).reduce(
    (q, key) => q + `${key}=${filters[key]}&`,
    ""
  );
  return Axios.get(
    `${REACT_APP_API_URL}/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&${query}page=${page}`
  );
};
