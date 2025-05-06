/**
 * Format an integer budget into USD string, e.g. 1000000 -> "$1,000,000"
 * @param {number} amount
 * @returns {string|any}
 */
/**
 * Format an integer budget into USD string, e.g. 1000000 -> "$1,000,000"
 * @param {number} amount
 * @returns {string|any}
 */
export function formatBudget(amount: number | any): string | any {
  if (typeof amount !== 'number') return amount;
  return '$' + amount.toLocaleString('en-US');
}