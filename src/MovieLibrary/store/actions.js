import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_LOADING,
  FETCH_MORE_MOVIES,
} from "../../actionTypes";
import { getMoviesLastPageLoaded, getAllMoviesIsLoaded } from "./selectors";

import { fachNowPlaying } from "../../services/moviesApi";
// import topRatedMovies from "../mocks/topTatedMovies";

export const fetchNowPlayingMovies = () => async (dispatch) => {
  dispatch({
    type: FETCH_MOVIES_LOADING,
  });
  try {
    const results = await Promise.all([
      fachNowPlaying(1),
      fachNowPlaying(2),
      fachNowPlaying(3),
    ]);

    const movies = [];
    const totalPages = results[0].data.total_pages;
    results.forEach((res) => {
      movies.push(...res.data.results);
    });
    dispatch({
      type: FETCH_MOVIES,
      payload: { movies, totalPages },
    });
  } catch (error) {
    dispatch({
      type: FETCH_MOVIES_ERROR,
      payload: error.message,
    });
  }
};

export const fetchMoreNowPlayingMovies = () => async (dispatch, getState) => {
  if (getAllMoviesIsLoaded(getState())) return;
  const nextPage = getMoviesLastPageLoaded(getState()) + 1;
  dispatch({
    type: FETCH_MOVIES_LOADING,
  });
  try {
    const { data } = await fachNowPlaying(nextPage);
    dispatch({
      type: FETCH_MORE_MOVIES,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MOVIES_ERROR,
      payload: error.message,
    });
  }
};
