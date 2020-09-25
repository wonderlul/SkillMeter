import React from 'react';

import ICollapse from '../../models/ICollapse';

import styles from './CHeader.module.scss';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { Layout, Input } from 'antd';

export const CHeader = ({
  isCollapsed,
  collapseHandler = (): void => {},
}: ICollapse) => {
  const { Search } = Input;
  const { Header } = Layout;

  return (
    <div className={styles.Container}>
      <Header className={styles.siteLayoutBackground}>
        {isCollapsed ? (
          <MenuUnfoldOutlined
            onClick={() => collapseHandler(isCollapsed)}
            className={styles.trigger}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => collapseHandler(isCollapsed)}
            className={styles.trigger}
          />
        )}
        <Search
          className={styles.searchBar}
          placeholder="search employee"
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />
      </Header>
    </div>
  );
};

export default CHeader;
