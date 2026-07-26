import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/person/')({
  beforeLoad: () => {
    throw redirect({ to: '/people/$page', params: { page: '1' } });
  },
});
