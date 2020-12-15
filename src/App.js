import React, { useEffect, useState } from "react";
import "./Reset.css";
import "./App.less";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useHistory,
} from "react-router-dom";
import Home from "./pages/home";

const App = () => {
  let history = useHistory();
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
