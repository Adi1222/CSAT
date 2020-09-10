import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Local imports
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navber from "./components/Navbar";

const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <>
            <Navber />
            <Route path="/dashboard" component={Dashboard} />
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
