import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, sortMovies } from "../../store/actions";
import "./filters.scss";

const Filters = (props) => {
  const { page } = props;
  const dispatch = useDispatch();
  const { filters, search } = useSelector((state) => state);
  const [years, setYears] = useState([]);
  const [data, setData] = useState({
    sort: "",
    year: "",
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 30; i++) years.push((currentYear - i).toString());
    setYears(years);
  }, []);

  useEffect(() => {
    (data.sort || data.year) && search && dispatch(setSearch(false));
  }, [data]);

  useEffect(() => {
    !filters &&
      setData({
        sort: "",
        year: "",
      });
  }, [filters]);

  useEffect(() => {
    let filters = {};
    if (data.sort) filters.sort_by = data.sort;
    if (data.year) filters.year = data.year;

    if (Object.keys(filters).length) dispatch(sortMovies({ filters, page }));
  }, [data, page]);

  const handleSelectChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <div className="filter-container">
      <div className="filter">
        <label>Sort: </label>
        <select name="sort" value={data.sort} onChange={handleSelectChange}>
          <option value="" disabled>
            Select Order
          </option>
          <option value="original_title.asc">Title Ascending</option>
          <option value="original_title.desc">Title Descending</option>
        </select>
      </div>
      <div className="filter">
        <label>Year: </label>
        <select name="year" value={data.year} onChange={handleSelectChange}>
          <option value="" disabled>
            Select Year
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
