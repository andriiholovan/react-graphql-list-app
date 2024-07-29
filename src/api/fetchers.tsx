import { gql, GraphQLClient } from 'graphql-request';
import z from 'zod';

import { PeopleSchema, PersonSchema } from './schema';

// todo: implement pagination based on graphQL requests
// const PER_PAGE = 10;

const BASE_URI = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
const client = new GraphQLClient(BASE_URI);

export class PersonNotFoundError extends Error {}

export async function fetchAllPeople() {
  // I'm using zod to validate endpoint response in the runtime
  const data = await client.request<{ allPeople: z.infer<typeof PeopleSchema> }>(
    gql`
      query AllPeople {
        allPeople {
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
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          totalCount
        }
      }
    `,
    // {
    //   per_page: PER_PAGE,
    // },
  );
  return PeopleSchema.parse(data.allPeople);
}

export async function fetchPersonByID(personId: string) {
  // I'm using zod to validate endpoint response in the runtime
  const { person } = await client.request<{ person: z.infer<typeof PersonSchema> }>(
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
  return PersonSchema.parse(person);
}
