import mongoose, { Schema, Document } from "mongoose";

export enum ELevels {
  TRAINEE,
  JUNIOR,
  MID,
  SENIOR,
  NOT_DEFINED,
}

export interface ILevels extends Document {
  level: ELevels;
}

const LevelsSchema: Schema<ELevels> = new Schema({
  level: { type: ELevels, required: true },
});

export default mongoose.model<ILevels>("seniority_level", LevelsSchema);
