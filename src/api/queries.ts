import { gql } from 'graphql-request';
import type z from 'zod';

import { gqlClient as client } from './client';
import { PeopleSchema, PersonSchema } from './schema';

export async function fetchAllPeople(variables?: {
  offset?: number;
  limit?: number;
}) {
  const data = await client.request<{
    allPeople: z.infer<typeof PeopleSchema>;
  }>(
    gql`
      query AllPeople($offset: Int = 0, $limit: Int = 10) {
        allPeople(offset: $offset, limit: $limit) {
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
