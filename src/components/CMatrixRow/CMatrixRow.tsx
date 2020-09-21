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
  ],
};

const CMatrixRow = () => {
  const skills = employee.skills.map((skill) => (
    <Col className="gutter-row">
      <CCircle level={skill.level as levelRange} />
    </Col>
  ));
  return (
    <Row gutter={16} align="middle">
      <Col className="gutter-row">
        <CUserSignature {...employee} />
      </Col>
      {skills}
    </Row>
  );
};

export default CMatrixRow;
