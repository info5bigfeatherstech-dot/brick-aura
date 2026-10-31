import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatPriceRange,
  formatPricePerSqFt,
  formatArea,
  formatPossession,
  formatIndianCount,
} from './format';

describe('formatPrice', () => {
  it('formats amounts in Lacs correctly', () => {
    expect(formatPrice(4500000)).toBe('₹45 Lac');
    expect(formatPrice(7550000)).toBe('₹75.5 Lac');
    expect(formatPrice(4500000, true)).toBe('₹45 L');
  });

  it('formats amounts in Crores correctly', () => {
    expect(formatPrice(10000000)).toBe('₹1 Cr');
    expect(formatPrice(12500000)).toBe('₹1.25 Cr');
    expect(formatPrice(34000000, true)).toBe('₹3.4 Cr');
  });

  it('handles edge cases and zero amounts', () => {
    expect(formatPrice(0)).toBe('Price on Request');
    expect(formatPrice(-500)).toBe('Price on Request');
  });
});

describe('formatPriceRange', () => {
  it('formats distinct min and max', () => {
    expect(formatPriceRange(5000000, 15000000)).toBe('₹50 L - ₹1.5 Cr');
  });

  it('handles identical min and max', () => {
    expect(formatPriceRange(8000000, 8000000)).toBe('₹80 Lac');
  });
});

describe('formatArea & formatPricePerSqFt', () => {
  it('formats area with sq.ft', () => {
    expect(formatArea(1250)).toBe('1,250 sq.ft');
  });

  it('formats rate per sq.ft', () => {
    expect(formatPricePerSqFt(8500)).toBe('₹8,500/sq.ft');
  });
});

describe('formatPossession', () => {
  it('identifies ready to move status', () => {
    expect(formatPossession('Ready to move')).toBe('Ready to Move');
    expect(formatPossession('Dec 2026')).toBe('Dec 2026');
  });
});

describe('formatIndianCount', () => {
  it('formats counts into L+ and Cr+', () => {
    expect(formatIndianCount(240000)).toBe('2.4L+');
    expect(formatIndianCount(8500)).toBe('9k+');
  });
});

