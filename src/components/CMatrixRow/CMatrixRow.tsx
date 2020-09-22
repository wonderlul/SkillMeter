import React from 'react';
import style from './CMatrixRow.module.scss';

import CCircle, { levelRange } from '../CCircle/CCircle';
import CUserSignature from '../CUserSignature/CUserSignature';
import { Row, Col } from 'antd';

const employee = {
  name: 'John',
  lastName: 'Doe',
  urlAvatar:
    'https://pbs.twimg.com/profile_images/762226166736547840/hQXGSqX6_bigger.jpg',
  skills: [
    { name: 'domestic', level: 1 },
    { name: 'kran', level: 2 },
    { name: 'samant', level: 4 },
    { name: 'domestic', level: 0 },
    { name: 'kran', level: 2 },
    { name: 'samant', level: 4 },
  ],
};

const CMatrixRow = () => {
  const skills = employee.skills.map((skill) => (
    <div className={style.Cell}>
      {!!skill.level && <CCircle level={skill.level as levelRange} />}
    </div>
  ));
  return (
    <div className={style.Row}>
      <div className={style.Signature_Cell}>
        <CUserSignature {...employee} />
      </div>
      {skills}
    </div>
  );
};

export default CMatrixRow;
