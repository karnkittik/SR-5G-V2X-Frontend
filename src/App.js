import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import General from "./pages/general/index";
import Admin from "./pages/admin/index";
import LogInPage from "./pages/admin/LogIn";
import styled from "styled-components";
import cookie from "js-cookie";
const App = () => {
  const [islogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (!cookie.get("5G-V2X")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [islogin]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <General />
        </Route>
        <Route
          path="/admin"
          exact
          render={(props) => (!islogin ? <Redirect to="/login" /> : <Admin />)}
        />
        <Route
          path="/login"
          exact
          render={(props) =>
            islogin ? <Redirect to="/admin" /> : <LogInPage />
          }
        />
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: calc(var(--vh, 1vh) * 100);
`;
const NotFound = () => {
  return <FullPage>404: Page Not Found</FullPage>;
};
export default App;
