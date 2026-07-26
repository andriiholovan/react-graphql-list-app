import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';

import { schema } from './schema.js';

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});

const server = createServer((req, res) => {
  if (req.url === '/api/graphql') {
    yoga(req, res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = Number(process.env.API_PORT ?? 4000);
server.listen(PORT, '127.0.0.1', () => {
  console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});
