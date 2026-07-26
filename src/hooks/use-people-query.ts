import { useQuery } from '@tanstack/react-query';
import { fetchAllPeople } from '../api';

type UsePeopleQueryOptions = {
  offset?: number;
  limit?: number;
  filter?: string;
  sortBy?: string;
  sortDirection?: string;
};

export function usePeopleQuery(options: UsePeopleQueryOptions = {}) {
  const { offset = 0, limit = 10, ...rest } = options;

  return useQuery({
    queryKey: ['allPeople', { offset, limit, ...rest }],
    queryFn: () => fetchAllPeople({ offset, limit, ...rest }),
    placeholderData: (prev) => prev,
  });
}
