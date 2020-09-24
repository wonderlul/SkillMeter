import React, { FC } from 'react';
import { IEmployee } from '../../models/IEmployee';
import { ISkills } from '../../models/ISkills';
import style from './CMatrixRequires.module.scss';

const requiredData = {
  skillsNumber: 8,
  required: [
    { skillname: 3 },
    { skillname2: 0 },
    { skillname3: 6 },
    { skillname4: 7 },
  ],
  trained: [
    { skillname: 3 },
    { skillname2: 1 },
    { skillname3: 4 },
    { skillname4: 7 },
  ],
};

const CMatrixRequires: FC<{
  skills: ISkills[];
  skillsSorted: string[];
  employees: IEmployee[];
}> = ({ skills, skillsSorted, employees }) => {
  const skillsData =
    skillsSorted &&
    skillsSorted.map((skill) => {
      let skillLevel: number = 0;
      let trainedEmployees: number = 0;

      employees.forEach((employee) => {
        let employeeSkill = employee.skills!.find(
          (empSkill) => empSkill.skill?.name === skill && empSkill.level > 0
        );
        if (employeeSkill) {
          trainedEmployees += 1;
          skillLevel += employeeSkill.level;
        }
      });

      return { trainedEmployees, skillLevel };
    });

  return (
    <div className={style.Column}>
      <div className={style.Row}>
        <span className={style.Title}>Trained</span>
        {skillsData &&
          skillsData.map((skillData) => (
            <div className={style.Cell}>{skillData.trainedEmployees}</div>
          ))}
      </div>
      <div className={style.Row}>
        <span className={style.Title}>Skill Level</span>
        {skillsData &&
          skillsData.map((skillData) => (
            <div className={style.Cell}>{skillData.skillLevel}</div>
          ))}
      </div>
    </div>
  );
};

export default CMatrixRequires;
