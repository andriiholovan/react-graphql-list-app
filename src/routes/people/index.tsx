import { createFileRoute } from '@tanstack/react-router';

import { peopleQuery } from '../../api';
import { NotFound, People, PeopleSkeleton } from '../../components';

export const Route = createFileRoute('/people/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(peopleQuery),
  pendingComponent: PeopleSkeleton,
  notFoundComponent: NotFound,
  component: People,
});
