import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getYearFromDateString } from "../../utils";
import "./list.scss";

const { REACT_APP_IMAGE_URL } = process.env;

const ListPage = () => {
  const { movies, loading } = useSelector((state) => state);

  return (
    <div className="container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Film Title</th>
            <th>Released</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td type="image-title">
                <img
                  src={`${REACT_APP_IMAGE_URL}${movie.poster_path}`}
                  alt="Movie"
                />
                <div>
                  <h4>{movie.title}</h4>
                  <p>{movie.overview}</p>
                </div>
              </td>
              <td>{getYearFromDateString(movie.release_date)}</td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={3}>
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;
