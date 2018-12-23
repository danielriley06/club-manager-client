import { Route, State, transitionPath } from "router5";
import { startsWithSegment } from "router5-helpers";

import { IRoute } from "../types/routes";
import { routes as allRoutes } from "./routes";

export function getActivatedRoutes(
  routes: IRoute[],
  toState: State,
  fromState: State | null
) {
  if (toState === null) {
    return [];
  }
  const { toActivate } = transitionPath(toState, fromState);
  return toActivate.map(segment => getRoute(segment, routes));
}

export const getRoute = (segment: string, routes: Route[]) => {
  for (const route of routes) {
    if (route.name === segment) {
      return route;
    }

    // Segment is child route of current route.
    if (startsWithSegment(segment, route.name) && route.children) {
      const splitSegment = segment.split(".");
      splitSegment.shift();
      if (splitSegment.length > 0) {
        return getRoute(splitSegment.join("."), route.children);
      }
    }
  }
  throw new Error("route not found");
};

export const getComponent = (
  name: string,
  nodeName: string | undefined = ""
) => {
  const segments = name.split("."); // Break route in segments (levels)
  const nodeSegments = nodeName.split(".");

  const depth = nodeName === "" ? 1 : nodeSegments.length + 1;

  const segment = segments.slice(0, depth).join(".");
  console.log("HEYFUCK", segments, nodeSegments, depth, segment);
  const route = getRoute(segment, allRoutes);
  console.log("HEYFUCKNEXT", route);
  return route.component || null;
};
