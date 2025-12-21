export interface ExpenseValidationInput {
  title?: unknown;
  amount?: unknown;
  date?: unknown;
}

export interface ExpenseValidationErrors {
  title?: string;
  amount?: string;
  date?: string;
}

/**
 * Helpers
 */
function isValidTitle(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.trim().length <= 30
  );
}

function isValidAmount(value: unknown): boolean {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0;
}

function isValidDate(value: unknown): boolean {
  if (!value) return false;
  const date = new Date(value as string | number | Date);
  return !isNaN(date.getTime()) && date.getTime() < Date.now();
}

/**
 * Main validator
 */
export function validateExpenseInput(
  input: ExpenseValidationInput
): asserts input is {
  title: string;
  amount: number | string;
  date: string | Date;
} {
  const validationErrors: ExpenseValidationErrors = {};

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid expense title. Must be at most 30 characters long.';
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount =
      'Invalid amount. Must be a number greater than zero.';
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.';
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}
