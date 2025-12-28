import type {
  ActionFunctionArgs,
  LinksFunction,
} from '@remix-run/node';
import { ReactNode } from 'react';
import AuthForm from '~/components/auth/AuthForm';
import { login, signup } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css?url';

/* ---------------- Types ---------------- */

type RawCredentials = {
  email?: string;
  password?: string;
};

type AuthCredentials = {
  email: string;
  password: string;
};

/* ---------------- Page ---------------- */

export default function AuthPage(): ReactNode {
  return <AuthForm />;
}

/* ---------------- Action ---------------- */

export async function action(
  { request }: ActionFunctionArgs
) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') ?? 'login';

  const formData = await request.formData();

  const rawCredentials: RawCredentials = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  };

  try {
    validateCredentials(rawCredentials);
  } catch (error) {
    return error;
  }

  // ✅ Type narrowing AFTER validation
  const credentials: AuthCredentials = {
    email: rawCredentials.email!,
    password: rawCredentials.password!,
  };

  try {
    if (authMode === 'login') {
      return await login(credentials);
    }

    return await signup(credentials);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      (error as { status: number }).status === 422
    ) {
      return {
        credentials:
          (error as { message?: string }).message ??
          'Invalid credentials.',
      };
    }

    return { credentials: 'Invalid username or password.' };
  }
}

/* ---------------- Links ---------------- */

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: authStyles },
];
