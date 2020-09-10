import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import "./App.scss";

import Layout from "./components/CLayout/CLayout";

export const App = () => {
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
};

export default App;
