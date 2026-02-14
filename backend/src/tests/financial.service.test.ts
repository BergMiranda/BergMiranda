import { computeTotals } from '../services/financial.service';

describe('computeTotals', () => {
  it('calculates subtotal tax and total', () => {
    const totals = computeTotals(100, 2, 50);
    expect(totals).toEqual({ subtotal: 200, tax: 16, total: 216 });
  });
});
