import React, { PropsWithChildren } from 'react';
import styles from './CUser.module.scss';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export interface IUserSignature {
  name: string;
  lastName: string;
  urlAvatar?: string;
}

const CUserSignature = ({ name, lastName, urlAvatar }: IUserSignature) => {
  const avatar = urlAvatar ? (
    <Avatar size="large" src={urlAvatar} shape="square" />
  ) : (
    <Avatar size="large" icon={<UserOutlined />} shape="square" />
  );

  return (
    <Row gutter={12} align="middle">
      <Col className="gutter-row">{avatar}</Col>
      <Col className="gutter-row">{`${name} ${lastName}`}</Col>
    </Row>
  );
};
export default CUserSignature;
