import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { getAllEmployees } from "./services/employeesSvc";

import "./App.scss";

import Layout from "./components/CLayout/CLayout";

export const App = () => {
  getAllEmployees();
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
};

export default App;
