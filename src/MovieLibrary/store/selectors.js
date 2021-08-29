export const getMovies = state => state.movieLib.movies
export const getMoviesLastPageLoaded = (state) => state.movieLib.lastPageLoaded;
export const getAllMoviesIsLoaded = (state) =>
  state.movieLib.lastPageLoaded === state.movieLib.totalPages;
export const getMoviesTotalPages = (state) => state.movieLib.totalPages;
export const getMoviesIsLoading = (state) => state.movieLib.isLoading;