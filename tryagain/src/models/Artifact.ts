import {
    getModelForClass,
    prop,
  } from '@typegoose/typegoose';
import { Directive, Field, InputType, ObjectType } from 'type-graphql';

// export interface AircraftAddInput {
//   name: string;

// }

@InputType()
export class UpdateAircraft {
    @Field()
    id: string;

    @Field()
    @prop()
    name!: string;
  
    @Field()
    @prop({ nullable: true })
    maxPass!: String;

    @Field()
    @prop({ nullable: true })
    destination!: string;
}

@InputType()
export class DeleteAircraft {
    @Field()
    id: string;
}



  @Directive('@key(fields: "id")')
  @ObjectType()
  export class Aircraft {
    @Field()
    readonly id!: string;
  
    @Field()
    @prop({ nullable: true })
    name!: string;
  
    @Field()
    @prop({ nullable: true })
    maxPass!: String;

    @Field()
    @prop({ nullable: true })
    destination!: string;
  
  }

    @InputType()
  export class aircraftCreate  {

    @Field()
    @prop({ nullable: true })
    name!: string;

    @Field()
    @prop({ nullable: true })
    maxPass!: String;

    @Field()
    @prop({ nullable: true })
    destination!: string;

  }

  const AircraftModel = getModelForClass(Aircraft) 
  export default AircraftModel;
  