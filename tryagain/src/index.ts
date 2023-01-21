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
import { buildSubgraphSchema } from "@apollo/subgraph";
import * as fs from 'fs';



class ArtifactService {
  
    async findArtifacts() {
      console.log("running");
      return AircraftModel.find();
    }

    async findArtifactbyid(id:ObjectId) {
        console.log("running");

        return AircraftModel.findById(id);
      }

      async artifactCreate(arr:aircraftCreate) {
        const crAr = (await AircraftModel.create(arr)).save
        console.log(crAr)
        return crAr;
      }

      async artifacUpdate(post: UpdateAircraft) {
        // const mid = new mongoose.Types.ObjectId(post.id);
        // const findAircraft = await AircraftModel.findOne(mid);
        // console.log(findAircraft)
        const updateAircraft = await AircraftModel.findByIdAndUpdate(
            {id: post.id},
            {$set: {
              ...post
            }},
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
        //    
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

@Resolver(()=>Aircraft)
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
    async artifacUpdate(@Arg("post") post: UpdateAircraft)  {
       const ar =await this.artifactService.artifacUpdate(post);
       console.log(ar)
      return ar
    }

  @Mutation(() => Aircraft)
  async aircraftCreate(@Arg("arr") arr: aircraftCreate) {

    const t = this.artifactService.artifactCreate(arr);
    console.log(t)
        return t
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
    


    const typeDefs = gql`
     extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

        
        
        type Artifact  @key(fields: "id"){
        id:String!
        title: String!
        maxPass: String!
        destination:String!
        runway:Runway!
      }

          type Runway @key(fields: "id", resolvable: false) {
            id: String!
            }

      type Query {
    artifacts: [Artifact!]!
    findartifact:Artifact
    ping:String!
  }
  type Mutation{
    deleteArtifact:Artifact

  }
    `
    const resolvers = {
        Query:{
          artifacts: () => [Artifact]
        },
        Artifact: {
            __resolveReference: (reference) => {
                return AircraftModel.find();
            }
        }
    }
    //  const { buildSubgraphSchema } = require('@apollo/subgraph');

    //   const server = new ApolloServer({schema : buildSubgraphSchema({ typeDefs, ArtifactResolver }) 
    //   });

    // const typeDefs = fs.readFile(path.join(__dirname, './schema.graphql'), 'utf8', (error, data) => {
    //   console.log("schema",data)
    // })


    // let artiData : Aircraft[];
    // artiData= AircraftModel.find().toO ;

    
      const schema = await buildSubgraphSchema({
        typeDefs,resolvers 
      })
      
      const server = new ApolloServer({schema
      });

      console.log(` Server initialise`);
      // Start the server
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4007 },
      });
      
      console.log(`🚀  Server ready at: ${url}`);
      
      // const ar = AircraftModel.;
    // console.log(ar)
    } catch (err) {
      console.error(err);
    }
  }
  
  bootstrap();

async function connectDB() {
    const db = await mongoose.connect("mongodb://localhost/aircraftDB") ;
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

