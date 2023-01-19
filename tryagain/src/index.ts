import mongoose from "mongoose"
import Artifact from './models/Artifact'
async function connectDB() {
    const db = await mongoose.connect("mongodb://localhost/typegoosedb") ;
    console.log('database is connected to', db.connection.db.databaseName)
    
}
connectDB()


async function executeQueries(){
    const artifact = new Artifact ({
        name:"rfe",
        maxPass:300,
        destination: "string",
    });
    await artifact.save()
    console.log(artifact)

}
executeQueries()