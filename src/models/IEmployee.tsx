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
  id?: string;
  name: string;
  surname: string;
  startWorkDate: string;
  evaluationDate: string;
  tags?: string[];
  level: ELevels;
  position: EPositions;
  photo?: string;
  project?: string;
}
