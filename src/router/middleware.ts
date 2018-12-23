import { State } from "router5";
import { IRoute } from "../types/routes";
import { getActivatedRoutes } from "./utils";

export const asyncComponentLoader = (routes: IRoute[]) => () => (
  toState: State,
  fromState: State | null = null
) => {
  const onActivateHandlers = getActivatedRoutes(routes, toState, fromState)
    .filter(route => !route.component)
    .map(
      route =>
        new Promise((resolve, reject) => {
          route
            .loadComponent()
            .then(component =>
              Object.assign(route, { component: component.default })
            )
            .then(resolve)
            .catch(reject);
        })
    );
  return Promise.all(onActivateHandlers);
};

export const statusCodeDecorator = (routes: IRoute[]) => () => (
  toState: State,
  fromState: State | null
) => {
  const status = getActivatedRoutes(routes, toState, fromState).reduce(
    (s, route) => route.status || s,
    200
  );
  return Promise.resolve({ ...toState, status });
};
