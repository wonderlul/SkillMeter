import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import CLayout from "./components/CLayout/CLayout";
import Login from "./pages/Login/Login";

export const App = () => {
  const [isToken, setIsToken] = useState(true);
  return (
    <>
      <Router>
        {isToken ? <Login setIsToken={setIsToken} /> : <CLayout />}
      </Router>
    </>
  );
};

export default App;
