import React from "react";
import "./App.css";
import Members from "./container/Members";
import Events from "./container/Events";
// import EventCalender from "./container/EventCalender";
import Nav from "./container/Nav";
import { Provider } from "react-redux";
import store from "./store/index.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="conatainer-fluid">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
