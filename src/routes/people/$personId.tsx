import { createFileRoute } from '@tanstack/react-router';

import GlobalError from '../../components/GlobalError';
import { PersonComponent } from '../../components/Person';

export const Route = createFileRoute('/people/$personId')({
  errorComponent: GlobalError,
  component: PersonComponent,
});
