/**
 * Typed Pure Functions for Real Estate Home Loan & Affordability Calculations
 */

export interface EmiBreakdown {
  monthlyEmi: number;
  principal: number;
  totalInterest: number;
  totalPayment: number;
  principalPercentage: number;
  interestPercentage: number;
}

export interface AffordabilityResult {
  maxLoanAmount: number;
  estimatedHomeBudget: number; // assuming ~20% down payment
  maxAllowedEmi: number;
  downPayment: number;
  foirPercentage: number; // Fixed Obligation to Income Ratio (typically 40-50%)
}

/**
 * Standard Home Loan EMI Formula:
 * E = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
 * where P = principal loan amount
 * r = monthly interest rate (annualRate / 12 / 100)
 * n = tenure in months (tenureYears * 12)
 */
export function calculateEmi(principal: number, annualRatePercent: number, tenureYears: number): number {
  if (principal <= 0 || tenureYears <= 0) return 0;
  if (annualRatePercent <= 0) {
    return Math.round(principal / (tenureYears * 12));
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  return Math.round(emi);
}

/**
 * Calculate full breakdown of EMI payments (Principal vs Interest)
 */
export function calculateEmiBreakdown(
  principal: number,
  annualRatePercent: number,
  tenureYears: number
): EmiBreakdown {
  if (principal <= 0 || tenureYears <= 0) {
    return {
      monthlyEmi: 0,
      principal: 0,
      totalInterest: 0,
      totalPayment: 0,
      principalPercentage: 100,
      interestPercentage: 0,
    };
  }

  const monthlyEmi = calculateEmi(principal, annualRatePercent, tenureYears);
  const totalMonths = tenureYears * 12;
  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  const principalPercentage = totalPayment > 0 ? Math.round((principal / totalPayment) * 100) : 100;
  const interestPercentage = totalPayment > 0 ? 100 - principalPercentage : 0;

  return {
    monthlyEmi,
    principal,
    totalInterest,
    totalPayment,
    principalPercentage,
    interestPercentage,
  };
}

/**
 * Calculate maximum home purchasing affordability based on monthly income and current obligations
 * Standard Indian banking FOIR (Fixed Obligation to Income Ratio) is ~50%.
 * Max EMI allowed = (Monthly Income * 50%) - Existing EMIs
 * Loan Amount is then reverse-calculated from Max EMI.
 */
export function calculateAffordability(
  monthlyIncome: number,
  existingMonthlyEmi: number,
  annualRatePercent = 8.5,
  tenureYears = 20,
  foir = 0.50
): AffordabilityResult {
  const maxAvailableEmiBudget = Math.max(0, monthlyIncome * foir - existingMonthlyEmi);

  if (maxAvailableEmiBudget <= 0 || tenureYears <= 0) {
    return {
      maxLoanAmount: 0,
      estimatedHomeBudget: 0,
      maxAllowedEmi: 0,
      downPayment: 0,
      foirPercentage: foir * 100,
    };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const totalMonths = tenureYears * 12;

  // Reverse calculate Principal from EMI:
  // P = E * [(1 + r)^n - 1] / [r * (1 + r)^n]
  const maxLoanAmount = Math.round(
    (maxAvailableEmiBudget * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
  );

  // Home value assuming loan is 80% LTV (Loan-To-Value) and 20% down payment
  const estimatedHomeBudget = Math.round(maxLoanAmount / 0.8);
  const downPayment = estimatedHomeBudget - maxLoanAmount;

  return {
    maxLoanAmount,
    estimatedHomeBudget,
    maxAllowedEmi: Math.round(maxAvailableEmiBudget),
    downPayment,
    foirPercentage: foir * 100,
  };
}

