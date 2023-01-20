import {
    getModelForClass,
    prop,
  } from '@typegoose/typegoose';
  import { Field, ObjectType } from 'type-graphql';

  // export interface AircraftAddInput {
//   name: string;

// }

  export class Aircraft {
    readonly _id: string;
  
    @prop()
    name: string;
  
    @prop()
    maxPass: number;

    @prop()
    destination: string;
  
  }
  
  const AircraftModel = getModelForClass<typeof Aircraft>(Aircraft) 
  export default AircraftModel;
  