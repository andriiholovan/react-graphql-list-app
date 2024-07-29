import { queryOptions } from '@tanstack/react-query';
import { fetchAllPeople } from './fetchers';

export const peopleQueryOptions = queryOptions({
  queryKey: ['allPeople'],
  queryFn: fetchAllPeople,
});
