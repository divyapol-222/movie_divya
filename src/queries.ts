export const queries = {
    movies: {
      listAllMovies: `
        SELECT imdbId, title, genres, releaseDate, budget
        FROM movies
        ORDER BY title ASC
        LIMIT ? OFFSET ?
      `,
      getMovieDetails: `
        SELECT * FROM movies WHERE imdbId = ?
      `,
      listMoviesByYear: (order) => `
        SELECT imdbId, title, genres, releaseDate, budget
        FROM movies
        WHERE substr(releaseDate, 1, 4) = ?
        ORDER BY releaseDate ${order}
        LIMIT ? OFFSET ?
      `,
      listMoviesByGenre: `
        SELECT imdbId, title, genres, releaseDate, budget
        FROM movies
        WHERE lower(genres) LIKE ?
        ORDER BY title ASC
        LIMIT ? OFFSET ?
      `,
  },
  ratings: {
      getAverageRating: `
        SELECT AVG(rating) as avgRating FROM ratings WHERE movieId = ?
      `,
  },
};