import { fetchPersonByID } from '../api/fetchers';
import type { PersonType } from '../api/schema';
import { useGQLQuery } from './useGQLQuery';

export function usePersonQuery(personId: string) {
  return useGQLQuery<PersonType>(['person', { personId }], () =>
    fetchPersonByID(personId),
  );
}
