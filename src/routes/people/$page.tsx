import { createFileRoute } from '@tanstack/react-router';

import { People, PeopleSkeleton } from '../../components';

export const Route = createFileRoute('/people/$page')({
  pendingComponent: PeopleSkeleton,
  component: People,
});
