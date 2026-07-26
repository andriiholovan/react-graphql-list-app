import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(
  `${window.location.origin}/api/graphql`,
);
