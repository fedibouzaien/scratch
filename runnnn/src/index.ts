import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose"
import { Arg,Mutation,Query, Resolver, buildSchema } from "type-graphql";
import RunwayModel ,{Runway, } from "./models/Runway"
import { ObjectId } from "mongodb";


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

class RunwayService {
  
  async findRunways() {
    console.log("running");
    return RunwayModel.find();
  }

  async findRunwaybyid(id:ObjectId) {
    console.log("running");

    return RunwayModel.find(id);
  }

  async runwayDelete(p: String) {
    const findPost = await RunwayModel.findById(p);
    console.log(findPost);
    const r = await RunwayModel.findByIdAndDelete(p);
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

@Resolver()
class RunwayResolver {
constructor(private runwayService: RunwayService) {
  this.runwayService = new RunwayService();
}

@Mutation(() => Runway)//
  async deleteRunway(
    @Arg("id") id: String
  ) {
    const arti = await this.runwayService.runwayDelete(id);
    console.log("arti",arti)
    return arti ;
    // return this.artifactsCollection;
  }

@Query(() => [Runway])
async runways() {
  const arti = await this.runwayService.findRunways();
  return arti ;
}
@Query(() => Runway)//
  async findRunway(
    @Arg("id", type => String) id: ObjectId
  ) {
    const arti = await this.runwayService.findRunwaybyid(id);
    console.log(arti)
    return arti ;
    // return this.artifactsCollection;
  }
}

// const runways = [
//     {
//       name: 'The Awakening',
//       number: '30',
//     },
//     {
//         name: 'The Awakeassssning',
//         number: '302',
//     },
//   ];
  // const resolvers = {
  //   Query: {
  //       runways: () => runways,
  //   },
  // };
  import gql from "graphql-tag";

  const typeDefs = gql`
extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

            
            type Runway @key(fields: "id"){
            id: String!
            name:String!
            number:String!
            destination:String!
            }

            type Query {
              runways: [Runway!]!
              findRunway:Runway!
  }
  `;

  async function bootstrap(){

    

    const schema = await buildSchema({
      resolvers: [RunwayResolver ],
    });

    const server = new ApolloServer({schema
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);

    connectDB();
    async function executeQueries(){
      const artifact = new RunwayModel ({
          name:"rfe",
          destination: "string",
      });
      await artifact.save()
      console.log(artifact)
  
  }

     executeQueries()
  }

  bootstrap()
  // const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  // });

  
  

//   async function executeQueries(){
//     const runway = new  Runway ();
//     await runway.save()
//     console.log(runway)

// }


  async function connectDB() {
    const db = await mongoose.connect("mongodb://localhost/runway") ;
    console.log('database is connected to', db.connection.db.databaseName);
    
    
}
