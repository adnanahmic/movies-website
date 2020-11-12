import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewDashboardIcon from "mdi-react/ViewDashboardIcon";
import FormatListBulletedIcon from "mdi-react/FormatListBulletedIcon";
import SearchIcon from "mdi-react/SearchIcon";
import CloseIcon from "mdi-react/CloseIcon";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setSearch, searchMovies } from "../../store/actions";

const Header = (props) => {
  const { page } = props;
  const dispatch = useDispatch();
  const { filters, search } = useSelector((state) => state);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (showSearch) {
      dispatch(setSearch(true));
      if (filters) {
        dispatch(setFilters(false));
      }
    } else dispatch(setSearch(false));
  }, [showSearch]);

  useEffect(() => {
    if (!search) {
      setSearchText("");
      setShowSearch(false);
    }
  }, [search]);

  useEffect(() => {
    searchText &&
      searchText.length % 3 === 0 &&
      dispatch(searchMovies({ searchText, page }));
  }, [searchText, page]);

  return (
    <header>
      <Link className="logo" to="/">
        <img src="/logo192.png" alt="Logo" />
        <p>Movies DB</p>
      </Link>
      <nav type="main">
        <Link to="/">
          <ViewDashboardIcon className="icon" size={36} />
          <span>Cards</span>
        </Link>
        <Link to="/list">
          <FormatListBulletedIcon className="icon" size={36} />
          <span>List</span>
        </Link>
      </nav>
      <nav type="sub">
        {showSearch ? (
          <>
            <input
              className="search-input"
              type="text"
              placeholder="Search movies"
              onChange={(event) => setSearchText(event.target.value)}
              value={searchText}
            />
            <CloseIcon
              className="icon"
              size={36}
              onClick={() => setShowSearch(false)}
            />
          </>
        ) : (
          <SearchIcon
            size={48}
            onClick={() => setShowSearch(true)}
            className="icon-search"
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
