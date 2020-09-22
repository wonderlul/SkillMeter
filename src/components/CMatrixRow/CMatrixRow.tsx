import React, { FC } from 'react';
import style from './CMatrixRow.module.scss';

import CCircle, { levelRange } from '../CCircle/CCircle';
import CUserSignature from '../CUserSignature/CUserSignature';
import { IEmployee } from '../../models/IEmployee';
import { ISkills } from '../../models/ISkills';
import { Dropdown, Menu } from 'antd';

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
    const menu = (
      <Menu>
        <Menu.Item>
          <div
            className=""
            onClick={() => {
              console.log(1);
            }}
          >
            <CCircle level={1} />
          </div>
        </Menu.Item>
        <Menu.Item>
          <CCircle level={2} />
        </Menu.Item>
        <Menu.Item>
          <CCircle level={3} />
        </Menu.Item>
        <Menu.Item>
          <CCircle level={4} />
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={style.Cell}>
          {!!skillEmployee && (
            <CCircle level={skillEmployee.level as levelRange} />
          )}
        </div>
      </Dropdown>
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
