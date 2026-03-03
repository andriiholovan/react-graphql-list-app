import { fetchPersonByID, type PersonType } from '../api';
import { useGQLQuery } from './useGQLQuery';

export function usePersonQuery(personId: string) {
  return useGQLQuery<PersonType>(['person', { personId }], () =>
    fetchPersonByID(personId),
  );
}
