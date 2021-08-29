import {
  FETCH_MOVIES,
  FETCH_MORE_MOVIES,
  FETCH_MOVIES_ERROR,
  FETCH_MOVIES_LOADING,
} from "../../actionTypes";

const initialState = {
  lastPageLoaded: 1,
  totalPages: null,
  isLoading: false,
  error: null,
  movies: [],
};

export default function movies(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_MOVIES_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case FETCH_MOVIES:
      return {
        ...state,
        lastPageLoaded: 3,
        isLoading: false,
        ...payload,
      };
    case FETCH_MORE_MOVIES:
      return {
        ...state,
        lastPageLoaded: ++state.lastPageLoaded,
        movies: [...state.movies, ...payload],
        isLoading: false,
      };

    default:
      return state;
  }
}
