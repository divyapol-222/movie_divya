// Dynamically require sqlite3, fallback to stub if unavailable
// let sqlite3: any;
// try {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   sqlite3 = require('sqlite3');
//   sqlite3.verbose();
// } catch (err) {
//   // Fallback stub for sqlite3 in test environment or if not installed
//   sqlite3 = {
//     verbose: () => {},
//     OPEN_READONLY: 0,
//     Database: class DummyDatabase {
//       all(sql: string, params: any[], cb: any) {
//         cb(null, []);
//       }
//       get(sql: string, params: any[], cb: any) {
//         cb(null, undefined);
//       }
//     },
//   };
// }
import { config } from './config';
import * as sqlite3 from 'sqlite3';

sqlite3.verbose();

let moviesDb: sqlite3.Database | null = null;
let ratingsDb: sqlite3.Database | null = null;

/**
 * Get or open the movies database.
 * @returns {sqlite3.Database}
 */
/**
 * Get or open the movies database.
 */
function getMoviesDb(): sqlite3.Database {
  if (!moviesDb) {
    moviesDb = new sqlite3.Database(
      config.moviesDb,
      sqlite3.OPEN_READONLY
    );
  }
  return moviesDb;
}

/**
 * Get or open the ratings database.
 * @returns {sqlite3.Database}
 */
/**
 * Get or open the ratings database.
 */
function getRatingsDb(): sqlite3.Database {
  if (!ratingsDb) {
    ratingsDb = new sqlite3.Database(
      config.ratingsDb,
      sqlite3.OPEN_READONLY
    );
  }
  return ratingsDb;
}

/**
 * Promisified interface for the sqlite3 driver.
 */
/**
 * Promisified interface for the sqlite3 driver.
 */
export const db = {
  movies: {
    /**
     * Execute a query that returns multiple rows.
     * @param {string} sql
     * @param {Array<any>} [params]
     * @returns {Promise<Array<any>>}
     */
    all(sql: string, params: any[] = []): Promise<any[]> {
      const dbConn = getMoviesDb();
      return new Promise((resolve, reject) => {
        dbConn.all(sql, params, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    },
    /**
     * Execute a query that returns a single row.
     * @param {string} sql
     * @param {Array<any>} [params]
     * @returns {Promise<any>}
     */
    get(sql: string, params: any[] = []): Promise<any> {
      const dbConn = getMoviesDb();
      return new Promise((resolve, reject) => {
        dbConn.get(sql, params, (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    },
  },
  ratings: {
    /**
     * Execute a ratings query that returns a single row.
     * @param {string} sql
     * @param {Array<any>} [params]
     * @returns {Promise<any>}
     */
    get(sql: string, params: any[] = []): Promise<any> {
      const dbConn = getRatingsDb();
      return new Promise((resolve, reject) => {
        dbConn.get(sql, params, (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    },
  },
};