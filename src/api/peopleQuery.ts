import { queryOptions } from '@tanstack/react-query';
import { fetchAllPeople } from './fetchers';

export const peopleQuery = queryOptions({
  queryKey: ['allPeople'],
  queryFn: fetchAllPeople,
});
