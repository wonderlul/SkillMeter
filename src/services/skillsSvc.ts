import { skills } from './mocks/skillsMock';

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
  id: string;
  name: string;
  category: string;
  weight: ESkills;
}

export const getAllSkills = (): ISkills[] => {
  return skills;
};
