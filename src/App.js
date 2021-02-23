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
import { AuthService } from "./utils/api";
import Loading from "./pages/admin/Loading";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault("Asia/Bangkok");

const App = () => {
  const [islogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    AuthService.getProfile(
      ({ data }) => {
        setIsLogin(true);
        setLoading(false);
        console.log(data);
      },
      (response) => {
        setIsLogin(false);
        setLoading(false);
        console.log(response.message);
      }
    );
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
          render={(props) =>
            loading ? (
              <Loading />
            ) : !islogin ? (
              <Redirect to="/login" />
            ) : (
              <Admin />
            )
          }
        />
        <Route
          path="/login"
          exact
          render={(props) => {
            return islogin ? <Redirect to="/admin" /> : <LogInPage />;
          }}
        />
        <Route
          path="/admin"
          render={(props) => {
            return !islogin ? <LogInPage /> : <Redirect to="/admin" />;
          }}
        />
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
