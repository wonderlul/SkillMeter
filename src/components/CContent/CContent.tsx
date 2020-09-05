import React from "react";
import { Route } from "react-router-dom";

import styles from "./CContent.module.scss";

import Home from "../../pages/Home";
import Employees from "../../pages/Employees";
import Skillsets from "../../pages/Skillsets";

import { Layout } from "antd";

export const CContent = () => {
  const { Content } = Layout;

  return (
    <>
      <Content className={styles.siteLayoutBackground}>
        <Route exact path="/" component={Home} />
        <Route path="/skills" component={Skillsets} />
        <Route path="/employees" component={Employees} />
      </Content>
    </>
  );
};

export default CContent;
