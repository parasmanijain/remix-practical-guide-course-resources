import type { ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { destroyUserSession } from '~/data/auth.server';

/* ---------------- Action ---------------- */

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
}
