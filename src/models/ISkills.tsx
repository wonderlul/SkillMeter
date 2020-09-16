export enum ESortSkills {
  NAME,
  CATEGORY,
  WEIGHT,
}

export enum ESortSkillsDirection {
  ASCEND = 1,
  DESCEND = -1,
}

export interface ISort {
  tag: ESortSkills;
  direction: ESortSkillsDirection;
}

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

export interface ISkills {
  _id: string;
  name: string;
  category: string;
  weight: ESkills;
}

export type ISkillsDTO = Omit<ISkills, "_id">;
