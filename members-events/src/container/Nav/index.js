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
  const pathName = props.location.pathname;
  return (
    <ul className="nav nav-tabs">
      {RouteMap.map((r, i) => {
        return (
          <li
            role="presentation"
            className={`${props.location.pathname === r.path ? "active" : ""}`}
          >
            <Link to={r.path}>{r.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default withRouter(Nav);
