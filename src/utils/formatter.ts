/**
 * Format an integer budget into USD string, e.g. 1000000 -> "$1,000,000"
 * @param {number} amount
 * @returns {string|unknown}
 */
/**
 * Format an integer budget into USD string, e.g. 1000000 -> "$1,000,000"
 * @param {number} amount
 * @returns {string|unknown}
 */
export function formatBudget(amount: unknown): string | unknown {
  if (typeof amount !== 'number') return amount;
  return '$' + amount.toLocaleString('en-US');
}