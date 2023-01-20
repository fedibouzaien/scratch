import mongoose from "mongoose"
import Artifact, { Aircraft } from './models/Artifact'
import { Query, Resolver, buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { types } from "@typegoose/typegoose";
import AircraftModel from "./models/Artifact";



class ArtifactService {
  
    async findArtifacts() {
      // Pagination login
      console.log("running")
      return AircraftModel.find().lean();
    }
  }

@Resolver()
class ArtifactResolver {
//   private artifactsCollection: typeof Artifact[] = [];
constructor(private artifactService: ArtifactService) {
    this.artifactService = new ArtifactService();
  }
  @Query(returns => [Aircraft])
  async artifacts() {
    // fake async in this example
    return await this.artifactService.findArtifacts()
    // return this.artifactsCollection;
  }

  
}

const typeDefs = `
  type Artifact {
    title: String
    author: String
  }
  type Query {
    artifacts: [Artifact]
  }
`;

async function bootstrap() {
    try {
        

        // executeQueries()
  
      // build TypeGraphQL executable schema
      const schema = await buildSchema({
        resolvers: [ArtifactResolver],
      });
  
      // Create GraphQL server
    //   const server = new ApolloServer({ schema });

      
  
      const server = new ApolloServer({
        typeDefs,
        resolvers,
      });

      

      console.log(` Server initialise`);
      // Start the server
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4007 },
      });
      
      console.log(`🚀  Server ready at: ${url}`);
      connectDB()
      
    } catch (err) {
      console.error(err);
    }
  }
  
  bootstrap();

async function connectDB() {
    const db = await mongoose.connect("mongodb://localhost/typegoosedb") ;
    console.log('database is connected to', db.connection.db.databaseName)
    
}

const resolvers = {
    Query: {
      artifacts: () => Aircraft,
    },
  };

async function executeQueries(){
    const artifact = new Artifact ({
        name:"rfe",
        maxPass:300,
        destination: "string",
    });
    await artifact.save()
    console.log(artifact)

}

