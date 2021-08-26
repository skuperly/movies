import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchNowPlayingMovies } from "../store/actions";

import logo from "./logo.svg";
import "./MovieLibrary.css";
import { getMovies, getMoviesIsLoading } from "../store/selectors";
import MoviesList from "./MoviesList";

class MovieLibrary extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchNowPlayingMovies: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  };

  componentDidMount() {
    const { fetchNowPlayingMovies } = this.props;
    fetchNowPlayingMovies();
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
    isLoading: getMoviesIsLoading(state),
  }),
  { fetchNowPlayingMovies }
)(MovieLibrary);
