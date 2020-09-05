import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "./App.scss";

import Layout from "./components/CLayout/CLayout";

export const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Layout />
        </Switch>
      </Router>
    </>
  );
};

export default App;
