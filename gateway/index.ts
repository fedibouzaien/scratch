//  import 'reflect-metadata';
import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const main = async () => {

  const gateway = new ApolloGateway({
    serviceList: [
        { name: "Runway", url: "http://localhost:4000" },
        { name: "Aircraft", url: "http://localhost:4007" }
    ]
  })

  // const { schema, executor } = await gateway.load();


  const server = new ApolloServer({
    gateway
  });

  const { url } = await server.listen({ port: 6969 })

  console.log(`Apollo Gateway ready at ${url}`)
}


main().catch(console.error)
