const createError = require('../../src/utils/createError');

describe('createError util', () => {
  it('creates an Error with statusCode and message', () => {
    const err = createError(400, 'Bad Request');
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('Bad Request');
    expect(err.statusCode).toBe(400);
  });
});