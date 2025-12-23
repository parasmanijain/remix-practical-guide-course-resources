import { type ActionFunctionArgs } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css?url';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  // validate user input

  if (authMode === 'login') {
    // login logic
  } else {
    // signup logic (create user)
  }

  // temporary
  return null;
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
