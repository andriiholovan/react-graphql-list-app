import { createYoga } from 'graphql-yoga';
import { schema } from './schema.js';

export const config = { runtime: 'nodejs' };

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});
