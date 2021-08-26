export const sortMovies = (movies, sortingType) => {
  switch (sortingType) {
    case "name_asc":
      return [...movies].sort((a, b) => a.title.localeCompare(b.title));
    case "name_desc":
      return [...movies].sort((a, b) => -a.title.localeCompare(b.title));
    case "rating":
      return [...movies].sort((a, b) => b.vote_average - a.vote_average);
    default:
      return [...movies];
  }
};
