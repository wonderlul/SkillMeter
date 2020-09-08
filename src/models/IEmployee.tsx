export enum ELevels {
  JUNIOR = "Junior",
  MID = "Mid",
  SENIOR = "Senior",
}
export enum EPositions {
  SOFTWARE_DEVELOPER = "Software Developer",
  QA = "QA",
  PROJECT_MANAGER = "Project Manager",
}
export interface IEmployee {
  name: string;
  surname: string;
  startWorkDate: Date;
  evaluationDate: Date;
  tags?: string[];
  project: string;
  level: ELevels;
  position: EPositions;
  photo?: string;
}
