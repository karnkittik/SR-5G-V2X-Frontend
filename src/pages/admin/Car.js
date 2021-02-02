import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CarIndiv from "./CarIndiv";
import CarList from "./CarList";
const Car = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/car/:car_id">
          <CarIndiv />
        </Route>
        <Route path="*">
          <CarList />
        </Route>
      </Switch>
    </Router>
  );
};
export default Car;
