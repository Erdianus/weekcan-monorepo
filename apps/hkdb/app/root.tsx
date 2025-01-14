import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './tailwind.css';

import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';

import { cn } from './lib/utils';
import { commitSession, getSession } from './session';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));

  return json(
    {
      className: session.get('isDark') ? `dark html` : 'html',
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

const queryClient = new QueryClient();
export default function App() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en" className={data.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <QueryClientProvider client={queryClient}>
            <main className={cn('bg-background text-foreground')}>
              <Outlet />
            </main>
          </QueryClientProvider>
          <ScrollRestoration />
          <Scripts />
          <Toaster richColors position="bottom-right" closeButton />
        </NextUIProvider>
      </body>
    </html>
  );
}
