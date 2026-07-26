import { createSchema } from 'graphql-yoga';

// swapi.info is the most stable SWAPI REST source:
// - Returns all 82 characters with full data in a single request
// - Actively maintained, open-source (https://github.com/Juriy/swapi)
const SWAPI_REST_BASE = process.env.SWAPI_REST_BASE ?? 'https://swapi.info/api';

interface SwapiRestPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

function extractId(url: string): string {
  return url.replace(/\/$/, '').split('/').pop() ?? url;
}

function parseNumber(value: string): number | null {
  if (!value || value === 'unknown' || value === 'n/a') return null;
  // Handle comma-formatted numbers like "1,358"
  const cleaned = value.replace(/,/g, '');
  const num = Number.parseFloat(cleaned);
  return Number.isNaN(num) ? null : num;
}

const typeDefs = /* GraphQL */ `
  type Person {
    id: ID!
    name: String!
    birthYear: String
    eyeColor: String
    hairColor: String
    height: Float
    mass: Float
    gender: String
  }

  type PeopleConnection {
    people: [Person!]!
    totalCount: Int!
  }

  type Query {
    allPeople(offset: Int = 0, limit: Int = 10): PeopleConnection!
    person(id: ID!): Person
  }
`;

const resolvers = {
  Query: {
    allPeople: async (
      _: unknown,
      { offset = 0, limit = 10 }: { offset?: number; limit?: number },
    ) => {
      const res = await fetch(`${SWAPI_REST_BASE}/people/`);
      if (!res.ok) {
        throw new Error(`${SWAPI_REST_BASE} responded with ${res.status}`);
      }
      const people: SwapiRestPerson[] = await res.json();

      const mapped = people.map((p) => ({
        id: extractId(p.url),
        name: p.name,
        birthYear: p.birth_year,
        eyeColor: p.eye_color,
        hairColor: p.hair_color,
        height: parseNumber(p.height),
        mass: parseNumber(p.mass),
        gender: p.gender,
      }));

      const total = mapped.length;
      const start = Math.max(0, Math.min(offset, total));
      const end = Math.min(start + limit, total);
      const page = mapped.slice(start, end);

      return {
        people: page,
        totalCount: total,
      };
    },

    person: async (_: unknown, { id }: { id: string }) => {
      const res = await fetch(`${SWAPI_REST_BASE}/people/${id}/`);
      if (!res.ok) {
        throw new Error(
          `${SWAPI_REST_BASE} responded with ${res.status} for person ${id}`,
        );
      }
      const p: SwapiRestPerson = await res.json();

      return {
        id: extractId(p.url),
        name: p.name,
        birthYear: p.birth_year,
        eyeColor: p.eye_color,
        hairColor: p.hair_color,
        height: parseNumber(p.height),
        mass: parseNumber(p.mass),
        gender: p.gender,
      };
    },
  },
};

export const schema = createSchema({ typeDefs, resolvers });
