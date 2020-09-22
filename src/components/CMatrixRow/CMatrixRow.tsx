import React, { FC } from 'react';
import style from './CMatrixRow.module.scss';

import CCircle, { levelRange } from '../CCircle/CCircle';
import CUserSignature from '../CUserSignature/CUserSignature';
import { IEmployee } from '../../models/IEmployee';
import { ISkills } from '../../models/ISkills';

const CMatrixRow: FC<{ employee: IEmployee; skills: ISkills[] }> = ({
  employee,
  skills,
}) => {
  console.log(employee);
  employee.skills = employee.skills || [];

  const skillsCell = skills.map((skill) => {
    let skillEmployee = employee.skills!.find(
      (skillEmp) => skillEmp.skill.name === skill.name
    );
    return (
      <div
        className={style.Cell}
        onClick={() => {
          console.log('@@@@', employee, skill, '@@@@');
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
