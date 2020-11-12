import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ArrowTopCircleIcon from "mdi-react/ArrowTopCircleIcon";

import "./App.scss";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CardsPage from "./pages/CardsPage";
import ListPage from "./pages/ListPage";
import { getGenres, getMoviesList } from "./store/actions";

const App = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { genres, movies, filters, search, total } = useSelector(
    (state) => state
  );
  const [page, setPage] = useState(1);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (
      movies.length > 0 &&
      window.innerHeight + document.documentElement.scrollTop >
        ref.current.clientHeight
    ) {
      total > movies.length && setPage(page + 1);
    }
  };

  useEffect(() => {
    !genres.length && dispatch(getGenres());
    dispatch(getMoviesList(page));
    scrollTop();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movies]);

  useEffect(() => {
    setPage(1);
    scrollTop();
  }, [filters, search]);

  useEffect(() => {
    !filters && !search && dispatch(getMoviesList(page));
  }, [page, filters, search]);

  return (
    <Router>
      <Header page={page} />
      <div className="main-container" ref={ref}>
        <Filters page={page} />
        <Switch>
          <Route exact path="/" component={CardsPage} />
          <Route exact path="/list" component={ListPage} />
        </Switch>
      </div>
      <button className="top-button" onClick={scrollTop}>
        <ArrowTopCircleIcon color="#fff" size={32} />
      </button>
      <Footer />
    </Router>
  );
};

export default App;
