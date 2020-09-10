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

export interface IEmployee {
  _id?: string;
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

export interface IEmployeeDTO {
  _id: string;
  name: string;
  surname: string;
  startWorkDate: moment.Moment | null;
  evaluationDate: moment.Moment | null;
  tags?: string[];
  level: ELevels | null;
  position: EPositions | null;
  photo: string;
  project: string;
}
