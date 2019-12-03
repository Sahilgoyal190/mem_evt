import React from "react";
import { Link, withRouter } from "react-router-dom";

const RouteMap = [
  {
    label: "Members",
    path: "/"
  },
  {
    label: "Events",
    path: "/events"
  }
];

export const Nav = props => {
  return (
    <nav className="navbar navbar-inverse">
      <ul className="nav navbar-nav">
        {RouteMap.map((r, i) => {
          return (
            <li
              role="presentation"
              className={`${
                props.location.pathname === r.path ? "active" : ""
              }`}
              key={r.path}
            >
              <Link to={r.path}>{r.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
