import React, { FC, useEffect, useState } from "react";

import { Redirect } from "react-router-dom";

import CNavbar from "../CNavbar/CNavbar";
import CHeader from "../CHeader/CHeader";
import CContent from "../CContent/CContent";

import styles from "./CLayout.module.scss";

import ICollapse from "../../models/ICollapse";
import { getAccessToken } from "../../services/authSvc";

import { Layout } from "antd";

export const CLayout: FC<{ setIsToken: Function }> = ({ setIsToken }) => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const collapseHandler = (isCollapsed: ICollapse): void => {
    setIsCollapsed(!isCollapsed);
  };

  const token = getAccessToken();

  useEffect(() => {
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, [token]);

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
