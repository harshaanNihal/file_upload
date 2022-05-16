import React from "react";
import Files from "./Files";

import { Route, Redirect, Switch } from "react-router-dom";
import Sidebar from "../common/Sidebar";


const Dashboard = () => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <Switch>
      <Route exact key='/documents' path='/documents' component={Files} />
      <Redirect to='/documents' />
    </Switch>
  </div>
);

export default Dashboard;
