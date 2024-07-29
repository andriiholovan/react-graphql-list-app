import { NextUIProvider } from '@nextui-org/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';
import './index.css';

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </QueryClientProvider>,
);
