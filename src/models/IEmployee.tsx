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
  _id: string;
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

export type IEmployeeDTO = Omit<IEmployee, "_id">;

export interface IEmployeeForm {
  name: string;
  surname: string;
  startWorkDate: string | moment.Moment;
  evaluationDate: string | moment.Moment;
  tags?: string[];
  level: any;
  position: any;
  photo: string;
  project?: string;
}
