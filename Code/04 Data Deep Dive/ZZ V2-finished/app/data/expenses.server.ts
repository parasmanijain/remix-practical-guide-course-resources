import type { Expense } from '@prisma/client';
import { prisma } from './database.server';

// app/types/expense.ts
export interface ExpenseInput {
  title: string;
  amount: number | string;
  date: string | Date;
}

/**
 * Create Expense
 */
export async function addExpense(expenseData: ExpenseInput): Promise<Expense> {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: Number(expenseData.amount),
        date: new Date(expenseData.date),
      },
    });
  } catch {
    throw new Error('Failed to add expense.');
  }
}

/**
 * Get all expenses
 */
export async function getExpenses(): Promise<Expense[]> {
  try {
    return await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
  } catch {
    throw new Error('Failed to get expenses.');
  }
}

/**
 * Get single expense
 */
export async function getExpense(id: string): Promise<Expense | null> {
  try {
    return await prisma.expense.findFirst({
      where: { id },
    });
  } catch {
    throw new Error('Failed to get expense.');
  }
}

/**
 * Update expense
 */
export async function updateExpense(
  id: string,
  expenseData: ExpenseInput
): Promise<Expense> {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: Number(expenseData.amount),
        date: new Date(expenseData.date),
      },
    });
  } catch {
    throw new Error('Failed to update expense.');
  }
}

/**
 * Delete expense
 */
export async function deleteExpense(id: string): Promise<Expense> {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch {
    throw new Error('Failed to delete expense.');
  }
}
