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
