export enum ELevels {
  Junior = "Junior",
  Mid = "Mid",
  Senior = "Senior",
}

export interface IEmployee {
  name: string;
  surname: string;
  startWorkDate: Date;
  evaluationDate: Date;
  tags: string[];
  level: ELevels;
  position: string;
  photo: string;
}
