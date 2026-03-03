import { createFileRoute } from '@tanstack/react-router';

import { GlobalError, Person } from '../../components';

export const Route = createFileRoute('/people/$personId')({
  errorComponent: GlobalError,
  component: Person,
});
