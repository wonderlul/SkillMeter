import mongoose, { Schema, Document } from "mongoose";
import { ISkills } from "../../skills/models/skills.model";

export enum ELevels {
  TRAINEE,
  JUNIOR,
  MID,
  SENIOR,
  NOT_DEFINED,
}

export enum EPositions {
  SOFTWARE_DEVELOPER,
  QA,
  PROJECT_MANAGER,
  NOT_DEFINED,
}

export interface IEmployeeSkills extends Document {
  skill: ISkills;
  level: number;
}

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
  skills?: IEmployeeSkills[];
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
  project: { type: String, required: false },
  skills: [
    {
      skill: {
        ref: "skills",
        type: mongoose.Schema.Types.ObjectId,
      },
      level: { type: Number },
    },
  ],
});

export default mongoose.model<IEmployee>("employees", EmployeeSchema);
