import { useQuery } from '@tanstack/react-query';
import { fetchAllPeople } from '../api';

export function usePeopleQuery(offset: number, limit: number) {
  return useQuery({
    queryKey: ['allPeople', { offset, limit }],
    queryFn: () => fetchAllPeople({ offset, limit }),
    placeholderData: (prev) => prev,
  });
}
