/**
 * Indian Real Estate Formatters (Lac / Cr, Area, Dates, BHK)
 */

/**
 * Format a numeric amount in Rupees into Lacs (L) or Crores (Cr)
 * @param amountInRupees e.g. 4500000 or 15000000
 * @param compact whether to use short 'L'/'Cr' or full 'Lac'/'Cr'
 */
export function formatPrice(amountInRupees: number, compact = false): string {
  if (!amountInRupees || amountInRupees <= 0) return 'Price on Request';

  if (amountInRupees >= 10000000) {
    const crores = amountInRupees / 10000000;
    // If it has decimals, keep up to 2 decimal places, trimming trailing zeros
    const formatted = Number(crores.toFixed(2)).toString();
    return `₹${formatted} ${compact ? 'Cr' : 'Cr'}`;
  } else if (amountInRupees >= 100000) {
    const lacs = amountInRupees / 100000;
    const formatted = Number(lacs.toFixed(2)).toString();
    return `₹${formatted} ${compact ? 'L' : 'Lac'}`;
  } else if (amountInRupees >= 1000) {
    const thousands = amountInRupees / 1000;
    const formatted = Number(thousands.toFixed(1)).toString();
    return `₹${formatted} K`;
  }

  return `₹${amountInRupees.toLocaleString('en-IN')}`;
}

/**
 * Format a price range
 */
export function formatPriceRange(minRupees: number, maxRupees: number): string {
  if (minRupees === maxRupees) return formatPrice(minRupees);
  return `${formatPrice(minRupees, true)} - ${formatPrice(maxRupees, false)}`;
}

/**
 * Format price per square foot
 */
export function formatPricePerSqFt(rate: number): string {
  return `₹${rate.toLocaleString('en-IN')}/sq.ft`;
}

/**
 * Format carpet/super area with commas
 */
export function formatArea(sqFt: number): string {
  return `${sqFt.toLocaleString('en-IN')} sq.ft`;
}

/**
 * Format possession status or date
 */
export function formatPossession(dateOrStatus: string): string {
  if (!dateOrStatus) return 'Ready to Move';
  if (dateOrStatus.toLowerCase().includes('ready')) return 'Ready to Move';
  return dateOrStatus;
}

/**
 * Format numbers into Indian numbering string (e.g. 240000 -> 2.4L)
 */
export function formatIndianCount(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr+`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(1)}L+`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}k+`;
  }
  return num.toString();
}

