import AppFactory from '../../src/app';

describe('Movies routes - validation and 404', () => {
  let app;

  beforeAll(() => {
    app = AppFactory.createApp();
  });

  it('should return 404 for unknown routes', async () => {
    const res = await app.inject({ method: 'GET', url: '/not-a-route' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({ success: false, error: { message: 'The requested resource could not be found.' } });
  });

  it('should validate year param in /movies/year/:year', async () => {
    const res = await app.inject({ method: 'GET', url: '/movies/year/abcd' });
    expect(res.statusCode).toBe(400);
    const body = res.json();
    expect(body.success).toBe(false);
    expect(body.error).toHaveProperty('message');
    expect(body.error.message).toMatch(/year/);
  });

  it('should validate page query in /movies?page=', async () => {
    const res = await app.inject({ method: 'GET', url: '/movies?page=0' });
    expect(res.statusCode).toBe(400);
    const body = res.json();
    expect(body.success).toBe(false);
    expect(body.error.message).toMatch(/page/);
  });
});