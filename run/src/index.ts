import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Runway {
    name: String
    number: String
  }
  type Query {
    runways: [Runway]
  }
`;
const runways = [
    {
      name: 'The Awakening',
      number: '30',
    },
    {
        name: 'The Awakeassssning',
        number: '302',
    },
  ];
  const resolvers = {
    Query: {
        runways: () => runways,
    },
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);