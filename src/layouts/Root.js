import React from "react";
import { RouteNode } from "react-router5";

import User from "./User";
import Main from "./Main";

function Root({ route }) {
  const topRouteName = route.name.split(".")[0];

  if (topRouteName === "user") {
    return <User />;
  }

  return <Main />;
}

export default props => (
  <RouteNode nodeName="root">
    {({ route }) => <Root route={route} {...props} />}
  </RouteNode>
);
