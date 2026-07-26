import { useQuery } from '@tanstack/react-query';
import { fetchPersonByID } from '../api';

export function usePersonQuery(personId: string) {
  return useQuery({
    queryKey: ['person', { personId }],
    queryFn: () => fetchPersonByID(personId),
  });
}
