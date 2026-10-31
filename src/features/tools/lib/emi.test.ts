import { describe, it, expect } from 'vitest';
import { calculateEmi, calculateEmiBreakdown, calculateAffordability } from './emi';

describe('calculateEmi', () => {
  it('calculates accurate monthly EMI for standard home loan', () => {
    // 50 Lac loan, 8.5% interest, 20 years
    const emi = calculateEmi(5000000, 8.5, 20);
    // Standard standard banking value ~ 43,391
    expect(emi).toBeGreaterThan(43000);
    expect(emi).toBeLessThan(44000);
  });

  it('handles 0% interest', () => {
    // 12 Lac loan over 1 year at 0%
    expect(calculateEmi(1200000, 0, 1)).toBe(100000);
  });

  it('returns 0 for zero or negative values', () => {
    expect(calculateEmi(0, 8.5, 20)).toBe(0);
    expect(calculateEmi(5000000, 8.5, 0)).toBe(0);
  });
});

describe('calculateEmiBreakdown', () => {
  it('computes principal and interest shares correctly', () => {
    const breakdown = calculateEmiBreakdown(5000000, 8.5, 20);
    expect(breakdown.principal).toBe(5000000);
    expect(breakdown.monthlyEmi).toBeGreaterThan(43000);
    expect(breakdown.totalPayment).toBeGreaterThan(5000000);
    expect(breakdown.totalInterest).toBe(breakdown.totalPayment - breakdown.principal);
    expect(breakdown.principalPercentage + breakdown.interestPercentage).toBe(100);
  });
});

describe('calculateAffordability', () => {
  it('calculates home affordability based on FOIR', () => {
    // 1.5 Lac monthly income, 20,000 existing EMI, 8.5% interest, 20 years
    const result = calculateAffordability(150000, 20000, 8.5, 20);
    // FOIR allows up to 75,000 total EMI - 20,000 existing = 55,000 available EMI
    expect(result.maxAllowedEmi).toBe(55000);
    expect(result.maxLoanAmount).toBeGreaterThan(6000000);
    expect(result.estimatedHomeBudget).toBeGreaterThan(result.maxLoanAmount);
    expect(result.downPayment).toBe(result.estimatedHomeBudget - result.maxLoanAmount);
  });

  it('handles zero income or excessive obligations', () => {
    const result = calculateAffordability(50000, 60000, 8.5, 20);
    expect(result.maxAllowedEmi).toBe(0);
    expect(result.maxLoanAmount).toBe(0);
  });
});

