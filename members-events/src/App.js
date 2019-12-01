import React from "react";
import "./App.css";
import Members from "./container/Members";
import Events from "./container/Events";
import Nav from "./container/Nav";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="conatainer-fluid">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Members />
          </Route>
          <Route exact path="/members">
            <Members />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
