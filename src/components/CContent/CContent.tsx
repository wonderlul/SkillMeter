import React from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./CContent.module.scss";

import Home from "../../pages/Home";
import Employees from "../../pages/Employees";
import Skillsets from "../../pages/Skillsets";
import Form from "../../pages/Form";

import { Layout } from "antd";

export const CContent = () => {
  const { Content } = Layout;

  return (
    <>
      <Content className={styles.siteLayoutBackground}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/skills" component={Skillsets} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/add" component={Form} />
          <Route path="/employees/:id" component={Form} />
        </Switch>
      </Content>
    </>
  );
};

export default CContent;
