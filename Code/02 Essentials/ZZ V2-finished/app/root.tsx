import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  ErrorResponse,
} from '@remix-run/react';

import MainNavigation from '~/components/MainNavigation';
import styles from '~/styles/main.css?url';

export const meta = () => [
  {
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
  },
];

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function CatchBoundary({ error }: { error: ErrorResponse }) {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>{error.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>{error.statusText}</h1>
          <p>{error.data?.message || 'Something went wrong!'}</p>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const response = isRouteErrorResponse(error);

  if (response) {
    return <CatchBoundary error={error} />;
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className='error'>
          <h1>An error occurred!</h1>
          <p>{errorMessage}</p>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
