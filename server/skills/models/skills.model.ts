import mongoose, { Schema, Document } from "mongoose";

export enum ESkills {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
}

export interface IGetSkills {
  page?: number;
  columnKey?: string;
  order?: string;
}

export interface ISkills extends Document {
  name: string;
  category: string;
  weight: ESkills;
}

const SkillsSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  weight: { type: ESkills, required: true },
});

export default mongoose.model<ISkills>("skills", SkillsSchema);
