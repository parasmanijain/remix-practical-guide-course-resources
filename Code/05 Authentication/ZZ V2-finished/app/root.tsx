import type { ReactNode } from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import type { ErrorResponse } from '@remix-run/router';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';

import sharedStyles from '~/styles/shared.css?url';
import ErrorComponent from './components/util/Error';

/* ---------------- Meta ---------------- */

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'New Remix App' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
];

/* ---------------- Document ---------------- */

interface DocumentProps {
  title?: string;
  children: ReactNode;
}

function Document({ title, children }: DocumentProps) {
  return (
    <html lang='en'>
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/* ---------------- App ---------------- */

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

/* ---------------- Route Error Boundary ---------------- */

function CatchBoundary({ error }: { error: ErrorResponse }) {
  return (
    <Document title={error.statusText}>
      <main>
        <ErrorComponent title={error.statusText}>
          <p>
            {error.data?.message ??
              'Something went wrong. Please try again later.'}
          </p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return <CatchBoundary error={error} />;
  }

  const message =
    error instanceof Error
      ? error.message
      : 'Something went wrong. Please try again later.';

  return (
    <Document title='An error occurred'>
      <main>
        <ErrorComponent title='An error occurred'>
          <p>{message}</p>
          <p>
            Back to <Link to='/'>safety</Link>.
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}

/* ---------------- Links ---------------- */

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: sharedStyles },
];
