import type { LoaderFunctionArgs, LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { ReactNode } from 'react';
import MainHeader from '~/components/navigation/MainHeader';
import { getUserFromSession } from '~/data/auth.server';
import marketingStyles from '~/styles/marketing.css?url';

/* ---------------- Layout ---------------- */

export default function MarketingLayout(): ReactNode {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

/* ---------------- Loader ---------------- */

export async function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

/* ---------------- Links ---------------- */

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: marketingStyles },
];
