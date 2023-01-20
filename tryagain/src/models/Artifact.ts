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
    readonly id!: string;
  
    @Field()
    @prop({ nullable: true })
    name!: string;
  
    @Field()
    @prop({ nullable: true })
    maxPass!: number;

    @Field()
    @prop({ nullable: true })
    destination!: string;
  
  }

  const AircraftModel = getModelForClass<typeof Aircraft>(Aircraft) 
  export default AircraftModel;
  