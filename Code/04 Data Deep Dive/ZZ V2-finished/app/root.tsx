import type { ReactNode } from 'react';
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
import type { ErrorResponse } from '@remix-run/router';
import sharedStyles from '~/styles/shared.css?url';
import ErrorComponent from './components/util/Error';

export const meta = () => [
  {
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
  },
];

interface DocumentProps {
  title?: string;
  children: ReactNode;
}

function Document({ title, children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
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

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

interface CatchBoundaryProps {
  error: ErrorResponse;
}

function CatchBoundary({ error }: CatchBoundaryProps) {
  const message =
    typeof error.data === 'object' &&
      error.data !== null &&
      'message' in error.data
      ? String((error.data as { message: unknown }).message)
      : 'Something went wrong. Please try again later.';

  return (
    <Document title={error.statusText}>
      <main>
        <ErrorComponent title={error.statusText}>
          <p>{message}</p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <CatchBoundary error={error} />;
  }

  const message =
    error instanceof globalThis.Error
      ? error.message
      : 'Something went wrong. Please try again later.';

  return (
    <Document title="An error occurred">
      <main>
        <ErrorComponent title="An error occurred">
          <p>{message}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: sharedStyles }];
}
