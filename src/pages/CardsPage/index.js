import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getYearFromDateString } from "../../utils";
import "./cards.scss";

const { REACT_APP_IMAGE_URL } = process.env;

const CardsPage = () => {
  const { genres, movies, loading } = useSelector((state) => state);

  const generateGenres = (genre_ids) => {
    return genre_ids
      .slice(0, 2)
      .map((id) => genres.filter((genre) => genre.id === id)[0].name)
      .join(", ");
  };

  return (
    <div className="movie-card-container">
      {genres.length &&
        movies.map((movie, index) => (
          <div
            className="movie-card"
            style={{
              backgroundImage: `url(${REACT_APP_IMAGE_URL}${movie.backdrop_path})`,
            }}
            key={index}
          >
            <div className="overlay"></div>
            <div className="content">
              <div className="header">
                <h2 className="title">{movie.title}</h2>
                <h4 className="info">
                  ({getYearFromDateString(movie.release_date)}){" "}
                  {generateGenres(movie.genre_ids)}
                </h4>
              </div>
              <p className="desc">{movie.overview}</p>
            </div>
          </div>
        ))}
      {loading && <Loader />}
    </div>
  );
};

export default CardsPage;
