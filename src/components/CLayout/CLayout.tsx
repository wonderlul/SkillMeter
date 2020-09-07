import React, { useState, useEffect } from "react";

import CNavbar from "../CNavbar/CNavbar";
import CHeader from "../CHeader/CHeader";
import CContent from "../CContent/CContent";

import styles from "./CLayout.module.scss";

import { Layout } from "antd";

export const CLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const collapseHandler = (isCollapsed: boolean): void => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const onResize = () => {
      const windowWidth = window.screen.width;

      if (windowWidth < 800) {
        setIsCollapsed(true);
      } else if (windowWidth > 800) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
