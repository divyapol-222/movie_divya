# Fastify Movie API

Alternative implementation of the Movie API using Fastify and SQLite.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker](#docker)
- [CI/CD](#cicd)
- [Contributing](#contributing)
- [License](#license)

## Features
- List all movies (paginated)
- List movies by year with sort order
- List movies by genre
- Get detailed movie info including average ratings
- Input validation and centralized error handling
- SQLite backend using `sqlite3`
- Dockerized for production and development
- CI/CD with GitHub Actions

## Prerequisites
- [Node.js](https://nodejs.org/) v14.x, v16.x or v18.x
- SQLite database files:
  - `db/movies.db`
  - `db/ratings.db`
- [Docker](https://www.docker.com/) (optional)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<OWNER>/<REPO>.git
   cd <REPO>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Place your SQLite database files in the `db/` directory:
   ```bash
   mkdir -p db
   # Copy your movies.db and ratings.db into ./db
   ```

## Environment Variables
Create a `.env` file in the project root to override defaults (optional):
```
PORT=3001
NODE_ENV=development
MOVIES_DB=./db/movies.db
RATINGS_DB=./db/ratings.db
LOG_LEVEL=debug
```
Defaults are:
- `PORT`: 3001
- `NODE_ENV`: development
- `MOVIES_DB`: `db/movies.db`
- `RATINGS_DB`: `db/ratings.db`
- `LOG_LEVEL`: `debug` (development) or `info` (production)
## Build
```bash
npm run build
```
## Running the Server
Start the API service:
```bash
npm start
```
The server listens on `http://localhost:$PORT` (default: 3001).

## API Endpoints
Base URL: `http://localhost:3001/movies`

### GET /movies
List movies (paginated) with optional filtering.
- Query parameters:
  - `page` (integer, default: 1)
  - `year` (4-digit string, optional; filter by release year)
  - `genre` (string, optional; filter by genre)
  - `order` (string: `asc` or `desc`, optional; only applicable when filtering by year)
- Response:
  ```json
  {
    "success": true,
    "data": [ /* array of movie summaries */ ],
    "meta": { "page": 1 }
  }
  ```

### GET /movies/:id
Get detailed information for a movie by its IMDb ID.
- URL parameter:
  - `id` (string, required)
- Response:
  ```json
  {
    "success": true,
    "data": { /* detailed movie object */ }
  }
  ```

### GET /movies/year/:year
List movies released in a specific year.
- URL parameter:
  - `year` (4-digit string, required)
- Query parameters:
  - `page` (integer, default: 1)
  - `order` (string: `asc` or `desc`, default: `asc`)

### GET /movies/genre/:genre
List movies by genre.
- URL parameter:
  - `genre` (string, required)
- Query parameters:
  - `page` (integer, default: 1)

Error responses follow the format:
```json
{
  "success": false,
  "error": { "message": "Description of the error" }
}
```

## Testing
Run unit and integration tests with coverage:
```bash
npm test
```

## Docker
### Production Build
```bash
docker build -t movie-api .
docker run -p 3001:3001 -v $(pwd)/db:/app/db movie-api
```

### Development Build
```bash
docker build -f Dockerfile.dev -t movie-api-dev .
docker run -p 3001:3001 -v $(pwd):/app movie-api-dev
```

## CI/CD
- **CI**: GitHub Actions workflow `ci.yml` runs tests on push and pull requests against Node.js 14, 16, and 18.
- **CD**: GitHub Actions workflow `cd.yml` builds and pushes Docker images to GitHub Container Registry on push to `master`.

## Contributing
Contributions are welcome! Please open issues or pull requests for enhancements and bug fixes.

## License
This project is licensed under the MIT License.