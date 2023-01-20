import { ApolloGateway } from '@apollo/gateway';
const { ApolloServer } = require("apollo-server");


const startServer = () => {
  const gateway: ApolloGateway = new ApolloGateway({
    serviceList: [
        { name: "Runway", url: "http://localhost:4000/graphql" },
        { name: "Aircraft", url: "http://localhost:4007/graphql" }
    ],
  });

  const server = new ApolloServer({
    gateway
  });
  server.listen(6969).then(({ url }) => {
    console.log(`🚀 Gateway API running at ${url}`);
  });

};

startServer();


