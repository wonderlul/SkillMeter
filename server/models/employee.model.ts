import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  surname: string;
  startWorkDate: string;
  evaluationDate: string;
  tags?: string[];
  level: mongoose.Schema.Types.ObjectId[];
  position: mongoose.Schema.Types.ObjectId[];
  photo: string;
  project?: string;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  startWorkDate: { type: String, required: true },
  evaluationDate: { type: String, required: true },
  tags: [{ type: String, required: false }],
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seniority_level",
    required: true,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "positions",
    required: true,
  },
  photo: { type: String, required: true },
  project: { type: String, required: true },
});

export default mongoose.model<IEmployee>("employees", EmployeeSchema);
