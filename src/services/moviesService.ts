import { db } from '../db';
import createError from '../utils/createError';
import { formatBudget } from '../utils/formatter';
import { queries } from '../queries';

const ITEMS_PER_PAGE = 50;

export interface MovieSummary {
  imdbId: string;
  title: string;
  genres: string[];
  releaseDate: string;
  budget: string;
}

export async function listAllMovies(page: number = 1): Promise<{ page: number; data: MovieSummary[] }> {
  const currentPage = page < 1 ? 1 : page;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const rows = await db.movies.all(queries.movies.listAllMovies, [ITEMS_PER_PAGE, offset]);
  const data: MovieSummary[] = rows.map((row: any) => ({
    imdbId: row.imdbId,
    title: row.title,
    genres: JSON.parse(row.genres).map((g: any) => g.name),
    releaseDate: row.releaseDate,
    budget: formatBudget(row.budget),
  }));
  return { page: currentPage, data };
}

export interface MovieDetails {
  imdbId: string;
  title: string;
  description: string;
  releaseDate: string;
  budget: string;
  runtime: number;
  averageRating: number;
  genres: string[];
  originalLanguage: string;
  productionCompanies: string[];
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails> {
  const movie = await db.movies.get(queries.movies.getMovieDetails, [imdbId]);
  if (!movie) {
    throw createError(404, 'Movie not found');
  }
  const ratingRow = await db.ratings.get(queries.ratings.getAverageRating, [movie.movieId]);
  const avg = ratingRow?.avgRating ? parseFloat(ratingRow.avgRating) : 0;
  return {
    imdbId: movie.imdbId,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.releaseDate,
    budget: formatBudget(movie.budget),
    runtime: movie.runtime,
    averageRating: parseFloat(avg.toFixed(1)),
    genres: JSON.parse(movie.genres).map((g) => g.name),
    originalLanguage: movie.language,
    productionCompanies: JSON.parse(movie.productionCompanies).map((pc) => pc.name),
  };
}

export async function listMoviesByYear(
  year: string,
  page: number = 1,
  order: string = 'ASC'
): Promise<{ page: number; data: MovieSummary[] }> {
  const currentPage = page < 1 ? 1 : page;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const sort = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  const rows = await db.movies.all(
    queries.movies.listMoviesByYear(sort),
    [year, ITEMS_PER_PAGE, offset]
  );
  const data: MovieSummary[] = rows.map((row: any) => ({
    imdbId: row.imdbId,
    title: row.title,
    genres: JSON.parse(row.genres).map((g) => g.name),
    releaseDate: row.releaseDate,
    budget: formatBudget(row.budget),
  }));
  return { page: currentPage, data };
}

export async function listMoviesByGenre(
  genre: string,
  page: number = 1
): Promise<{ page: number; data: MovieSummary[] }> {
  const currentPage = page < 1 ? 1 : page;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const genreLower = genre.toLowerCase();
  const pattern = `%"name": "${genreLower}"%`;
  const rows = await db.movies.all(
    queries.movies.listMoviesByGenre,
    [pattern, ITEMS_PER_PAGE, offset]
  );
  const data: MovieSummary[] = rows.map((row: any) => ({
    imdbId: row.imdbId,
    title: row.title,
    genres: JSON.parse(row.genres).map((g) => g.name),
    releaseDate: row.releaseDate,
    budget: formatBudget(row.budget),
  }));
  return { page: currentPage, data };
}

// export { listAllMovies, getMovieDetails, listMoviesByYear, listMoviesByGenre };