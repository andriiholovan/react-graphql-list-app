import { createFileRoute } from '@tanstack/react-router';

import { peopleQueryOptions } from '../../api/queryOptions';
import NotFound from '../../components/NotFound';
import { PeopleComponent, PeoplePendingComponent } from '../../components/People';

export const Route = createFileRoute('/people/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(peopleQueryOptions),
  pendingComponent: PeoplePendingComponent,
  notFoundComponent: NotFound,
  component: PeopleComponent,
});
