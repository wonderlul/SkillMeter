import React, { PropsWithChildren } from 'react';
import styles from './CUserSignature.module.scss';
import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export interface IUserSignature {
  name: string;
  lastName: string;
  urlAvatar?: string;
}

const CUserSignature = ({ name, lastName, urlAvatar }: IUserSignature) => {
  const avatar = urlAvatar ? (
    <Avatar src={urlAvatar} shape="square" size="large" />
  ) : (
    <Avatar icon={<UserOutlined />} shape="square" size="large" />
  );

  return (
    <div className={styles.Row}>
      <div className={styles.Avatar}>{avatar}</div>
      <div className={styles.Name}>{`${name} ${lastName}`}</div>
    </div>
  );
};
export default CUserSignature;
