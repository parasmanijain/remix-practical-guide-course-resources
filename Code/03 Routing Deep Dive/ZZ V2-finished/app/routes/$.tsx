import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

export function loader({ params }: LoaderFunctionArgs) {
  if (params['*'] === 'exp') {
    return redirect('/expenses');
  }

  throw new Response('Not found', { status: 404 });
}
