import {
    getModelForClass,
    prop,
  } from '@typegoose/typegoose';

  export class Aircraft {
    readonly _id: string;
  
    @prop()
    name: string;
  
    @prop()
    maxPass: number;

    @prop()
    destination: string;
  
  }
  
  const AircraftModel = getModelForClass(Aircraft)
  export default AircraftModel;
  