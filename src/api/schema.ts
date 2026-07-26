import z from 'zod';

export const PersonSchema = z.object({
  birthYear: z.string().nullable(),
  eyeColor: z.string().nullable(),
  hairColor: z.string().nullable(),
  height: z.number().nullable(),
  id: z.string(),
  name: z.string(),
  gender: z.string().nullable(),
  mass: z.number().nullable(),
});

export const PeopleSchema = z.object({
  people: z.array(PersonSchema),
  totalCount: z.number(),
});

export type PeopleType = z.infer<typeof PeopleSchema>;
export type PersonType = z.infer<typeof PersonSchema>;
