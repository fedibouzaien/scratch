import mongoose from "mongoose"
import Artifact, { Aircraft } from './models/Artifact'
import { Query, Resolver, buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { types } from "@typegoose/typegoose";
import AircraftModel from "./models/Artifact";
import {TypegooseMiddleware} from './typegoose';
import * as path from "path";



class ArtifactService {
  
    async findArtifacts() {
      console.log("running");
      return AircraftModel.find();
    }
  }

@Resolver()
class ArtifactResolver {
//   private artifactsCollection: typeof Artifact[] = [];
constructor(private artifactService: ArtifactService) {
    this.artifactService = new ArtifactService();
  }
  @Query(() => [Aircraft])//
  async artifacts() {//Promise<Aircraft> 
    const arti = await this.artifactService.findArtifacts();
    return arti ;
    // return this.artifactsCollection;
  }
}

@Resolver()
class PingResolver {
  @Query(() => String)//
  async ping() {
    return "pong" ;
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
  type Query {
    ping: String
  }
`;

async function bootstrap() {
    try {
        

        // executeQueries()
  
      // build TypeGraphQL executable schema
      const schema = await buildSchema({
        resolvers: [ArtifactResolver , PingResolver],
        //globalMiddlewares: [TypegooseMiddleware],
       // emitSchemaFile: path.resolve(__dirname, "./src/schema.gql"),
      });
  
      // Create GraphQL server
    //   const server = new ApolloServer({ schema });

      
  
      const server = new ApolloServer({schema
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
    console.log('database is connected to', db.connection.db.databaseName);
    
    
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

