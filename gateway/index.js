const { ApolloGateway } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

/* Apollo */

const gateway = new ApolloGateway({
    serviceList: [
        { name: "Runway", url: "http://localhost:4007" },
        { name: "Aircraft", url: "http://localhost:4000" }
    ]
  });
const server = new ApolloServer({ gateway, subscriptions: false });

server.listen(6969).then(({ url }) => {
  console.log(`🚀 Gateway API running at ${url}`);
});
