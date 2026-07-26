import { gql } from 'graphql-request';
import type z from 'zod';

import { gqlClient as client } from './client';
import { PeopleSchema, PersonSchema } from './schema';

export async function fetchAllPeople(variables?: {
  offset?: number;
  limit?: number;
  filter?: string;
  sortBy?: string;
  sortDirection?: string;
}) {
  const data = await client.request<{
    allPeople: z.infer<typeof PeopleSchema>;
  }>(
    gql`
      query AllPeople(
        $offset: Int = 0
        $limit: Int = 10
        $filter: String
        $sortBy: String
        $sortDirection: String
      ) {
        allPeople(
          offset: $offset
          limit: $limit
          filter: $filter
          sortBy: $sortBy
          sortDirection: $sortDirection
        ) {
          people {
            birthYear
            eyeColor
            hairColor
            height
            id
            name
            gender
            mass
          }
          totalCount
        }
      }
    `,
    {
      offset: variables?.offset ?? 0,
      limit: variables?.limit ?? 10,
      filter: variables?.filter,
      sortBy: variables?.sortBy,
      sortDirection: variables?.sortDirection,
    },
  );
  return PeopleSchema.parse(data.allPeople);
}

export async function fetchPersonByID(personId: string) {
  const data = await client.request<{
    person: z.infer<typeof PersonSchema>;
  }>(
    gql`
      query Person($personId: ID!) {
        person(id: $personId) {
          birthYear
          eyeColor
          hairColor
          height
          mass
          id
          name
          gender
        }
      }
    `,
    {
      personId,
    },
  );
  return PersonSchema.parse(data.person);
}
