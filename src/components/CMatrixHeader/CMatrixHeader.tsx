import React, { FC } from "react";
import { ISkills } from "../../models/ISkills";
import { IHeader } from "../CMatrix/CMatrix";
import styles from "./CMatrixHeader.module.scss";

export interface IMatrixSkills {
  skills: ISkills[];
  skillsNumber: number;
  header: IHeader;
}
export interface ISkillsByCategory {
  [key: string]: number;
}
const CMatrixHeader: FC<IMatrixSkills> = ({ skills, skillsNumber, header }) => {
  const skillsByCategory: ISkillsByCategory = {};
  const categories: string[] = [];

  for (const category in header) {
    skillsByCategory[category] = header[category].length;

    if (categories.indexOf(category) === -1) {
      categories.push(category);
    }
  }

  return (
    <div className={styles.wrapper}>
      {categories.map((category, index) => {
        const isLong =
          skillsByCategory[category] <= 1 && category.length > 6
            ? `${styles.category}`
            : "";

        return (
          <div key={`${category}${index}`} className={styles.columnWrapper}>
            <div
              className={`${styles.skillsColumnHeader} ${
                isLong ? styles.longCategory : ""
              }`}
            >
              {category}
            </div>
            <div className={styles.skillsListWrapper}>
              <ul className={styles.skillsList}>
                {header[category].map((skill, index) => (
                  <li key={`${skill}${index}`} className={styles.skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CMatrixHeader;
