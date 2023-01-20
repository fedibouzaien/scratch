import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from "mongoose"
import { Query, Resolver, buildSchema } from "type-graphql";
import RunwayModel ,{Runway, } from "./models/Runway"


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Runway {
    id:String
    name: String
    number: String
    destination:String
  }
  type Query {
    runways: [Runway]
  }
`;

class RunwayService {
  
  async findRunways() {
    console.log("running");
    return RunwayModel.find();
  }
}

@Resolver()
class RunwayResolver {
constructor(private runwayService: RunwayService) {
  this.runwayService = new RunwayService();
}
@Query(() => [Runway])
async runways() {
  const arti = await this.runwayService.findRunways();
  return arti ;
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
