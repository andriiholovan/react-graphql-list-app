import { createFileRoute } from '@tanstack/react-router';

import { Person } from '../../components';

export const Route = createFileRoute('/person/$personId')({
  component: Person,
});
