import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Local imports
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navber from "./components/Navbar";
import Charts from "./components/Charts";

const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard/charts" component={Charts} />
          <>
            <Navber />
            <Route exact path="/dashboard" component={Dashboard} />
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
