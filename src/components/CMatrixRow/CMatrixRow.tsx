import React, { FC } from 'react';
import style from './CMatrixRow.module.scss';

import CCircle, { levelRange } from '../CCircle/CCircle';
import CUserSignature from '../CUserSignature/CUserSignature';
import { IEmployee } from '../../models/IEmployee';
import { ISkills } from '../../models/ISkills';

const CMatrixRow: FC<{
  employee: IEmployee;
  skills: ISkills[];
  skillsSorted: string[];
}> = ({ employee, skills, skillsSorted }) => {
  employee.skills = employee.skills || [];

  const skillsCell = skillsSorted.map((skill) => {
    let skillEmployee = employee.skills!.find(
      (skillEmp) => skillEmp.skill.name === skill
    );
    return (
      <div
        className={style.Cell}
        onClick={() => {
          console.log('@@@@', employee._id, skillEmployee, '@@@@');
        }}
      >
        {!!skillEmployee && (
          <CCircle level={skillEmployee.level as levelRange} />
        )}
      </div>
    );
  });
  return (
    <div className={style.Row}>
      <div className={style.Signature_Cell}>
        <CUserSignature {...employee} />
      </div>
      {skillsCell}
    </div>
  );
};

export default CMatrixRow;
