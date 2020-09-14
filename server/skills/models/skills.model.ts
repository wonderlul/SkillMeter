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

export interface ISkills extends Document {
  name: string;
  category: string;
  weight: ESkills;
  commnents?: string;
}

const SkillsSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  weight: { type: ESkills, required: true },
  comments: { type: String, required: false },
});

export default mongoose.model<ISkills>("skills", SkillsSchema);
