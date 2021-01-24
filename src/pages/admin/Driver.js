import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DriverIndiv from "./DriverIndiv";
import DriverList from "./DriverList";
const Driver = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <DriverList />
        </Route>
        <Route path="/admin/driver/:driver_id">
          <DriverIndiv />
        </Route>
      </Switch>
    </Router>
  );
};
export default Driver;
