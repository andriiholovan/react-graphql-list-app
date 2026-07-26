import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

export const config = { runtime: 'edge' };

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});
