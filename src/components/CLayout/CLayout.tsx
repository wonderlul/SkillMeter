import React, { useState } from "react";

import CNavbar from "../CNavbar/CNavbar";
import CHeader from "../CHeader/CHeader";
import CContent from "../CContent/CContent";

import styles from "./CLayout.module.scss";

import ICollapse from "../../models/ICollapse";

import { Layout } from "antd";

export const CLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const collapseHandler = (isCollapsed: ICollapse): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.centerWrapper}>
      <Layout>
        <CNavbar isCollapsed={isCollapsed} />
        <Layout className={styles.siteLayout}>
          <CHeader
            isCollapsed={isCollapsed}
            collapseHandler={collapseHandler}
          />
          <CContent />
        </Layout>
      </Layout>
    </div>
  );
};

export default CLayout;
