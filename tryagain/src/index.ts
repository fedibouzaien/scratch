import mongoose from "mongoose"
import Artifact, { Aircraft , UpdateAircraft, aircraftCreate} from './models/Artifact'
import { Arg, Args, Field, InputType, Mutation, Query, Resolver, buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { types } from "@typegoose/typegoose";
import AircraftModel from "./models/Artifact";
import {TypegooseMiddleware} from './typegoose';
import * as path from "path";
import gql from "graphql-tag";
import { ObjectId } from "mongodb";



class ArtifactService {
  
    async findArtifacts() {
      console.log("running");
      return AircraftModel.find();
    }

    async findArtifactbyid(id:ObjectId) {
        console.log("running");

        return AircraftModel.find(id);
      }

      async artifactCreate(arr:aircraftCreate) {
        const crAr = AircraftModel.create(arr)
        console.log(crAr)
        return crAr;
      }

      async artifacUpdate(post: UpdateAircraft) {
        const findAircraft = await AircraftModel.findById(post.id);
        console.log(findAircraft)
        const updateAircraft = await AircraftModel.findOneAndUpdate(
            {id: post.id},
            {$set: {
              name: post.name, 
              maxPass: post.maxPass,
              destination:post.destination
            }},
            {new: true}
        );
        console.log(updateAircraft)
        return updateAircraft;
    }

      async artifactDelete(p: String) {
        const findPost = await AircraftModel.findById(p);
        console.log(findPost);
        const r = await AircraftModel.findByIdAndDelete(p).then();
        console.log(r);
        // const deletePost = await AircraftModel.findOneAndUpdate(
        //     {id: p},
        //     {$set: {deleteFlag: true, }},
        //     {new: true}
        // ).then(function(){
        //     console.log(" deleted"); 
        //  }).catch(function(error){
        //     console.log(error); 
        //  });
        return findPost;
    }
   
  }

  // @InputType()
  // class ArtifactInput extends Aircraft {}

@Resolver()
class ArtifactResolver {
//   private artifactsCollection: typeof Artifact[] = [];
constructor(private artifactService: ArtifactService) {
    this.artifactService = new ArtifactService();
  }
  @Query(() => [Aircraft])//
  async artifacts() {
    const arti = await this.artifactService.findArtifacts();
    return arti ;
    // return this.artifactsCollection;
  }

  @Mutation(() => Aircraft)
    async artifacUpdate(@Arg("post") post: UpdateAircraft) {
        return this.artifactService.artifacUpdate(post);
    }

  @Mutation(() => Aircraft)
  async aircraftCreate(@Arg("arr") arr: aircraftCreate) {
        return this.artifactService.artifactCreate(arr);
    }

    @Mutation(() => Aircraft)//
  async deleteArtifact(
    @Arg("id") id: String
  ) {
    const arti = await this.artifactService.artifactDelete(id);
    console.log("arti",arti)
    return arti ;
    // return this.artifactsCollection;
  }

  @Query(() => Aircraft)//
  async findartifact(
    @Arg("id", type => String) id: ObjectId
  ) {
    const arti = await this.artifactService.findArtifactbyid(id);
    return arti ;
    // return this.artifactsCollection;
  }

  // @Mutation(() => [Aircraft])//
  // async addArtifacts(@Arg("option", () => ArtifactInput) option: ArtifactInput,) {
  //   const arti = await this.artifactService.addArtifacts();
  //   return arti ;
  //   // return this.artifactsCollection;
  // }

  // @Mutation(()=> Artifact)
  // async addArtifact(@Arg('ids', () => String) ids: string,) {
    
  //   const arti = await this.artifactService.delArtifacts({ids});
  //   return arti ;
  // }
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
        connectDB()

        // executeQueries()
  
      // build TypeGraphQL executable schema
      // const schema = await buildSchema({
      //   resolvers: [ArtifactResolver , PingResolver],
      //   //globalMiddlewares: [TypegooseMiddleware],
      //  // emitSchemaFile: path.resolve(__dirname, "./src/schema.gql"),
      // });
  
      // Create GraphQL server
    //   const server = new ApolloServer({ schema });
    // const { readFileSync } = require('fs');


    // const typeDefs = gql`
    //  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

        
    //     type Artifact  @key(fields: "id"){
    //     id:String!
    //     title: String!
    //     maxPass: String!
    //     destination:String!
    //   }
    //   type Query {
    //     artifacts: [Artifact!]!
    //   }
    // `
    // const resolvers = {
    //     User: {
    //         __resolveReference: (reference) => {
    //             return AircraftModel.find();
    //         }
    //     }
    // }
    //  const { buildSubgraphSchema } = require('@apollo/subgraph');

    //   const server = new ApolloServer({schema : buildSubgraphSchema({ typeDefs, ArtifactResolver }) 
    //   });

      const schema = await buildSchema({
        resolvers: [ArtifactResolver , PingResolver],
      })
      
      const server = new ApolloServer({schema
      });

      console.log(` Server initialise`);
      // Start the server
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4007 },
      });
      
      console.log(`🚀  Server ready at: ${url}`);
      
      
    } catch (err) {
      console.error(err);
    }
  }
  
  bootstrap();

async function connectDB() {
    const db = await mongoose.connect("mongodb://localhost/typegoosedb") ;
    console.log('database is connected to', db.connection.db.databaseName);
    
    
}

// const resolvers = {
//     Query: {
//       artifacts: () => Aircraft,
//     },
//   };

async function executeQueries(){
    const artifact = new Artifact ({
        name:"rfe",
        maxPass:300,
        destination: "string",
    });
    await artifact.save()
    console.log(artifact)

}

