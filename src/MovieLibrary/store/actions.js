import {
  FETCH_MOVIES,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_LOADING,
} from "../../actionTypes";
import { fachNowPlaying } from "../../services/moviesApi";
// import topRatedMovies from "../mocks/topTatedMovies";

export const fetchNowPlayingMovies = () => async (dispatch, getState) => {
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
    results.forEach((res) => {
      movies.push(...res.data.results);
    });

    dispatch({
      type: FETCH_MOVIES,
      payload: movies,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MOVIES_ERROR,
      payload: error.message,
    });
  }
};
