import { skills } from './mocks/skillsMock';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

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

export interface ISkill {
  id: string;
  name: string;
  category: string;
  weight: ESkills;
}

export const getAllSkills = (): ISkill[] => skills;

export const getSkill = (id: string): ISkill | undefined => {
  return skills.find((elem) => elem.id === id);
};

export const getCategories = (): string[] => {
  let categories = skills.reduce<string[]>((previous, current) => {
    previous.push(current.category);
    return previous;
  }, []);
  return Array.from(new Set<string>(categories));
};

export const getConfigFormData = (): {
  weights: number[];
  categories: string[];
} => {
  const config = {
    categories: getCategories(),
    weights: Object.values(ESkills).filter((elem) =>
      Number.isInteger(Number(elem))
    ) as number[],
  };
  return config;
};
