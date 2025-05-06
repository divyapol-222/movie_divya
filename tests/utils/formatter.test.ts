const { formatBudget } = require('../../src/utils/formatter');

describe('formatBudget util', () => {
  it('formats numeric budgets to USD strings', () => {
    expect(formatBudget(1000000)).toBe('$1,000,000');
    expect(formatBudget(0)).toBe('$0');
  });

  it('returns non-number inputs unchanged', () => {
    const obj = { foo: 'bar' };
    expect(formatBudget(obj)).toBe(obj);
    expect(formatBudget(null)).toBeNull();
    expect(formatBudget(undefined)).toBeUndefined();
  });
});