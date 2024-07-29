import z from 'zod';

export const PersonSchema = z.object({
  birthYear: z.string(),
  eyeColor: z.string(),
  hairColor: z.string(),
  height: z.union([z.number(), z.null()]),
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  mass: z.number().nullable(),
});

export const PeopleSchema = z.object({
  people: z.array(PersonSchema),
  pageInfo: z.object({
    endCursor: z.string(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
    startCursor: z.string(),
  }),
  totalCount: z.number(),
});

export type PeopleType = z.infer<typeof PeopleSchema>;
export type PersonType = z.infer<typeof PersonSchema>;
