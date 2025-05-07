import { Router, Request, Response, NextFunction } from 'express';
import {
  listAllMovies,
  getMovieDetails,
  listMoviesByYear,
  listMoviesByGenre,
} from '../services/moviesService';
import createError from '../utils/createError';

const router = Router();

function validatePage(pageParam: any): number {
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  if (pageParam && (isNaN(page) || page < 1)) {
    throw createError(400, 'Invalid page');
  }
  return page;
}

function validateYear(year: string): void {
  if (!/^[0-9]{4}$/.test(year)) {
    throw createError(400, 'Invalid year');
  }
}

function validateOrder(orderParam: any): 'ASC' | 'DESC' {
  if (orderParam) {
    const order = String(orderParam).toLowerCase();
    if (!['asc', 'desc'].includes(order)) {
      throw createError(400, 'Invalid order');
    }
    return order === 'desc' ? 'DESC' : 'ASC';
  }
  return 'ASC';
}
// Validate that the provided ID is a valid IMDb ID (e.g., "tt1234567")
function validateImdbId(id: string): void {
  if (!/^tt\d+$/i.test(id)) {
    throw createError(400, 'Invalid IMDb ID');
  }
}

router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = validatePage(req.query.page);
      const result = await listAllMovies(page);
      res.json({ success: true, data: result.data, meta: { page: result.page } });
    } catch (err: any) {
      next(err);
    }
function validateImdbId(id: string): void {
  if (!/^tt\d+$/i.test(id)) {
    throw createError(400, 'Invalid IMDb ID');
  }
  }
);

router.get(
  '/year/:year',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { year } = req.params;
      validateYear(year);
      const page = validatePage(req.query.page);
      const order = validateOrder(req.query.order);
      const result = await listMoviesByYear(year, page, order);
      res.json({ success: true, data: result.data, meta: { page: result.page } });
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/genre/:genre',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { genre } = req.params;
      if (!genre) {
        throw createError(400, 'Genre is required');
      }
      const page = validatePage(req.query.page);
      const result = await listMoviesByGenre(genre, page);
      res.json({ success: true, data: result.data, meta: { page: result.page } });
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError(400, 'IMDb ID is required');
      }
      validateImdbId(id);
      const data = await getMovieDetails(id);
      res.json({ success: true, data });
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;