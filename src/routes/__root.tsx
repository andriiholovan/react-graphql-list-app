import { lazy, Suspense } from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { QueryClient } from '@tanstack/react-query';

import NotFound from '../components/NotFound';

const TanStackRouterDevtools = process.env.NODE_ENV === 'production'
  ? () => null // Render nothing in production
  : lazy(() => import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools })));

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </Suspense>
    </>
  );
}
