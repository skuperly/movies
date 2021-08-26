import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Modal from "../components/Modal";
import TMDBImage from "./TMDBImage";
import { sortMovies } from "../utils";
import "./MoviesList.css";

const MoviesList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortedMovies, setSortedMovies] = useState([...movies]);
  const [sortingType, setSortingType] = useState();

  useEffect(() => {
    setSortedMovies(sortMovies(movies, sortingType));
  }, [sortingType, movies]);

  return (
    <div className="movies-list">
      <div className="items">
        <div>
          <span>Sort by:</span>
          <SortingOptions onChange={setSortingType} />
        </div>
        {sortedMovies.map((movie) => (
          <MovieListItem
            key={movie.id}
            movie={movie}
            isSelected={selectedMovie === movie}
            onSelect={setSelectedMovie}
          />
        ))}
      </div>
      <Modal open={!!selectedMovie} onClose={() => setSelectedMovie(null)}>
        <ExpandedMovieItem movie={selectedMovie} />
      </Modal>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ExpandedMovieItem = ({
  movie: {
    title,
    original_title,
    poster_path,
    overview,
    vote_average,
    vote_count,
  },
}) => (
  <div className="expanded-movie-item">
    <TMDBImage src={poster_path} className="poster" />
    <div className="description">
      <h2>
        {title}({original_title})
      </h2>
      <div>
        <h4>Rank(votes count)</h4>:{" "}
        <span>
          {vote_average}({vote_count})
        </span>
      </div>
      <span>{overview}</span>
    </div>
  </div>
);

const MovieListItem = ({ movie, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(movie);
  };

  return (
    <div
      className={classNames("movie-list-item", { selected: isSelected })}
      onClick={handleClick}>
      <TMDBImage
        src={movie.poster_path}
        alt={`${movie.title}(${movie.vote_average})`}
      />
    </div>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

class SortingOptions extends Component {
  state = {
    value: "",
  };

  handleChange = (e) => {
    const selectedValue = e.target.value;
    const { onChange } = this.props;
    this.setState({ value: selectedValue });
    onChange(selectedValue);
  };

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value=""></option>
        <option value="name_asc">A -> Z</option>
        <option value="name_desc">Z -> A</option>
        <option value="rating">Rating</option>
      </select>
    );
  }
}

export default MoviesList;
