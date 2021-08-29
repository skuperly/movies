import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchMoreNowPlayingMovies,
  fetchNowPlayingMovies,
} from "../store/actions";
import {
  getAllMoviesIsLoaded,
  getMovies,
  getMoviesIsLoading,
} from "../store/selectors";
import logo from "./logo.svg";
import "./MovieLibrary.css";
import MoviesList from "./MoviesList";

class MovieLibrary extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchNowPlayingMovies: PropTypes.func.isRequired,
    fetchMoreNowPlayingMovies: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    allMoviesIsLoaded: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { fetchNowPlayingMovies } = this.props;
    fetchNowPlayingMovies();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { fetchMoreNowPlayingMovies, isLoading, allMoviesIsLoaded } =
      this.props;
    if (allMoviesIsLoaded) {
      window.removeEventListener("scroll", this.handleScroll);
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    fetchMoreNowPlayingMovies();
  }

  render() {
    const { movies, isLoading } = this.props;
    return (
      <div className="MovieLibrary">
        <header className="ML-header">
          <img src={logo} className="ML-logo" alt="logo" />
          <h1 className="ML-title">Movies</h1>
        </header>
        <div className="ML-intro">
          {!!movies.length && <MoviesList movies={movies} />}
        </div>
        {isLoading && "Loading..."}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    movies: getMovies(state),
    allMoviesIsLoaded: getAllMoviesIsLoaded(state),
    isLoading: getMoviesIsLoading(state),
  }),
  { fetchNowPlayingMovies, fetchMoreNowPlayingMovies }
)(MovieLibrary);
