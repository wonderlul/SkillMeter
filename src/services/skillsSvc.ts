import { skills } from "./mocks/skillsMock";

import { ISkillsDTO, ESkills } from "../models/ISkills";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const getAllSkills = async (page: number) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/skills/?page=${page}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addSkill = async (skill: ISkillsDTO) => {
  try {
    const { data } = await axios.post(`${SERVER_URL}/skills`, skill);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getSkill = (id: string): ISkill | undefined => {
//   return skills.find((elem) => elem.id === id);
// };

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
