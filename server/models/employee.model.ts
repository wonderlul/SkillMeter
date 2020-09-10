import mongoose, { Schema, Document, mongo } from "mongoose";
import { ELevels } from "./ELevels";
import { EPositions } from "./EPositions";

export interface IEmployee extends Document {
  name: string;
  surname: string;
  startWorkDate: string;
  evaluationDate: string;
  tags?: string[];
  level: ELevels;
  position: EPositions;
  photo: string;
  project?: string;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  startWorkDate: { type: String, required: true },
  evaluationDate: { type: String, required: true },
  tags: [{ type: String, required: false }],
  level: { type: ELevels, required: true },
  position: { type: EPositions, required: true },
  photo: { type: String, required: true },
  project: { type: String, required: true },
});

export default mongoose.model<IEmployee>("employees", EmployeeSchema);
