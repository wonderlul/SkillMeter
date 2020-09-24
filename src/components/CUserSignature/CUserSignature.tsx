import React from 'react';
import styles from './CUserSignature.module.scss';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export interface IUserSignature {
  _id: string;
  name: string;
  surname: string;
  photo?: string;
}

const CUserSignature = ({ name, surname, photo, _id }: IUserSignature) => {
  const avatar = photo ? (
    <Avatar src={photo} shape="square" size="large" />
  ) : (
    <Avatar icon={<UserOutlined />} shape="square" size="large" />
  );
  const menu = (
    <div className={styles.Dropdown}>
      <Menu>
        <Menu.Item>
          <div className={styles.Disabled}>{'\u26D4'}</div>
        </Menu.Item>
      </Menu>
    </div>
  );
  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <div className={styles.Row}>
        <div className={styles.Avatar}>{avatar}</div>
        <div className={styles.Name}>{`${name} ${surname}`}</div>
      </div>
    </Dropdown>
  );
};
export default CUserSignature;
