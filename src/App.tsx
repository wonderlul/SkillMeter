import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";

import CLayout from "./components/CLayout/CLayout";
import Login from "./pages/Login/Login";

import { getAccessToken, clearToken } from "./services/authSvc";

export const App = () => {
  // clearToken();
  const token = getAccessToken();

  const [isToken, setIsToken] = useState(true);

  return (
    <>
      <Router>
        {isToken ? (
          <CLayout setIsToken={setIsToken} />
        ) : (
          <Login setIsToken={setIsToken} />
        )}
      </Router>
    </>
  );
};

export default App;
