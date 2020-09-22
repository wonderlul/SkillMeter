import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import CLayout from "./components/CLayout/CLayout";

export const App = () => {
  return (
    <>
      <Router>
        <CLayout />
      </Router>
    </>
  );
};

export default App;
