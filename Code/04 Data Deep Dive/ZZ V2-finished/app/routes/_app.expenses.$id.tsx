// /expenses/<some-id> => /expenses/expense-1, /expenses/e-1

import { type ActionFunctionArgs, redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

/**
 * Action
 */
export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id;

  if (!expenseId) {
    throw new Response('Expense ID is required', { status: 400 });
  }

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      // validation errors object (422)
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect('/expenses');
  }

  if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return { deletedId: expenseId };
  }

  throw new Response('Method not allowed', { status: 405 });
}
