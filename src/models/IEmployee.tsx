export enum ELevels {
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  NOT_DEFINED = "NOT_DEFINED",
}
export enum EPositions {
  SOFTWARE_DEVELOPER = "SOFTWARE_DEVELOPER",
  QA = "QA",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  NOT_DEFINED = "NOT_DEFINED",
}
export interface IEmployee {
  name: string;
  surname: string;
  startWorkDate: string;
  evaluationDate: string;
  tags?: string[];
  project: string;
  level: ELevels;
  position: EPositions;
  photo?: string;
  id?: string;
}
