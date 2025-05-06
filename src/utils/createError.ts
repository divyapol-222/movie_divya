/**
 * Create a simple error with HTTP status code
 * @param {number} statusCode
 * @param {string} message
 * @returns {Error}
 */
/**
 * Create a simple error with HTTP status code
 * @param {number} statusCode
 * @param {string} message
 * @returns {Error}
 */
/**
 * Create a simple error with HTTP status code
 */
export default function createError(
  statusCode: number,
  message: string
): Error & { statusCode: number; details?: any } {
  const err = new Error(message) as Error & {
    statusCode: number;
    details?: any;
  };
  err.statusCode = statusCode;
  return err;
}
// Support CommonJS require
// @ts-ignore
module.exports = createError;