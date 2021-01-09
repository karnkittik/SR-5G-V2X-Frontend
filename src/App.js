import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import General from "./pages/general/index";
import Admin from "./pages/admin/index";
import styled from "styled-components";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <General />
        </Route>
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
