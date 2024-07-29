import { useQuery } from '@tanstack/react-query';

type KeyType = string[] | [string, { [key: string] : unknown }];

export function useGQLQuery<APIResponse>(
  key: KeyType,
  fetchData: () => Promise<APIResponse>,
) {
  return useQuery({
    queryKey: key,
    queryFn: fetchData,
  });
}
