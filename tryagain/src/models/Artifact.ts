import {
    getModelForClass,
    prop,
  } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

// export interface AircraftAddInput {
//   name: string;

// }
  @ObjectType()
  export class Aircraft {
    @Field()
    readonly _id!: string;
  
    @Field()
    @prop()
    name!: string;
  
    @Field()
    @prop()
    maxPass!: number;

    @Field()
    @prop()
    destination!: string;
  
  }
  
  const AircraftModel = getModelForClass<typeof Aircraft>(Aircraft) 
  export default AircraftModel;
  