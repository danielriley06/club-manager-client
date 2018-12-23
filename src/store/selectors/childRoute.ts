import React from "react";
import { createRouteNodeSelector } from "redux-router5";
import { createSelector } from "reselect";
import DefaultComponent from "../../components/DefaultComponent";
import { getComponent } from "../../router/utils";

const getChildRoute = (route, routeNode) => {
  if (route.name === routeNode) {
    return null;
  }
  const component = getComponent(route.name, routeNode) || DefaultComponent;
  return React.createElement(component, { route });
};

const childRouteSelector = (routeNodeName = "") =>
  createSelector(
    createRouteNodeSelector(routeNodeName),
    ({ route, previousRoute }) => ({
      route,
      previousRoute,
      childRoute: getChildRoute(route, routeNodeName)
    })
  );

export default childRouteSelector;
