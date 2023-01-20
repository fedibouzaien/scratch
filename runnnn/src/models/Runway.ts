import {
  getModelForClass,
  prop,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

// export interface AircraftAddInput {
//   name: string;

// }
@ObjectType()
export class Runway {
  @Field()
  readonly id!: string;

  @Field()
  @prop({ nullable: true })
  name!: string;

  @Field()
  @prop({ nullable: true })
  number!: String;

  @Field()
  @prop({ nullable: true })
  destination!: string;

}

const RunwayModel = getModelForClass<typeof Runway>(Runway) 
export default RunwayModel;
