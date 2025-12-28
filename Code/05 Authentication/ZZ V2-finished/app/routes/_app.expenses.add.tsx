// /expenses/add

import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { requireUserSession } from '~/data/auth.server';
import { addExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    // navigate programmatically
    navigate('..');
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

/* ---------------- Action ---------------- */

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserSession(request);

  const formData = await request.formData();

  // ✅ Explicitly extract & convert form values
  const expenseData = {
    title: formData.get('title') as string,
    amount: Number(formData.get('amount')),
    date: new Date(formData.get('date') as string),
  };

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData, userId);
  return redirect('/expenses');
}
