-- Database Schema for Movie API

-- Movies table
CREATE TABLE movies (
  movieId INTEGER PRIMARY KEY,
  imdbId TEXT NOT NULL,
  title TEXT NOT NULL,
  overview TEXT,
  productionCompanies TEXT,
  releaseDate TEXT,
  budget INTEGER,
  revenue INTEGER,
  runtime REAL,
  language TEXT,
  genres TEXT,
  status TEXT
);

-- Ratings table
CREATE TABLE ratings (
  ratingId INTEGER PRIMARY KEY,
  userId INTEGER NOT NULL,
  movieId INTEGER NOT NULL,
  rating REAL NOT NULL,
  timestamp INTEGER NOT NULL
);