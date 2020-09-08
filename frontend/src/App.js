import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Local imports
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  return (
    <div className="main">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
