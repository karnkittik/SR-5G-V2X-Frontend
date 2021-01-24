import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import DriverInfo from "./DriverInfo";
import DriverList from "./DriverList";
const Driver = () => {
  //   let { id } = useParams();
  return (
    <Router>
      <Switch>
        {/* <Route path="/:id" children={<Child />} /> */}
        <Route exact path="/admin">
          <DriverList />
        </Route>
        <Route path="/admin/driver/:driver_id">
          <DriverInfo />
        </Route>
      </Switch>
    </Router>
  );
};
export default Driver;
