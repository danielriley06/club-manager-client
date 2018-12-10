import { State, Router, DoneFn } from "router5";
import { userIsLoggedIn } from "../utils/authentication";

export interface Route {
  name: string;
  path: string;
  component?: React.Component<{}>;
  forwardTo?: string;
  children?: Array<Route>;
  canActivate?();
}

export interface Routes extends Array<Route> {}

export const loggedInRequired = () => (
  toState: State,
  fromState: State,
  done: DoneFn
) => {
  if (userIsLoggedIn()) {
    return true;
  }
  return Promise.reject({ redirect: { name: "user" } });
};

export const authenticationRequired = () => (
  toState: State,
  fromState: State,
  done: DoneFn
) => {
  if (!userIsLoggedIn()) {
    return true;
  }
  return Promise.reject({ redirect: { name: "dashboard" } });
};

export const routes: Routes = [
  {
    name: "user",
    path: "/user",
    forwardTo: "user.login",
    children: [
      { name: "login", path: "/login", canActivate: authenticationRequired },
      {
        name: "register",
        path: "/register",
        canActivate: authenticationRequired
      }
    ]
  },
  {
    name: "dashboard",
    path: "/dashboard",
    forwardTo: "dashboard.directory",
    children: [
      { name: "directory", path: "/directory", canActivate: loggedInRequired },
      { name: "teams", path: "/teams", canActivate: loggedInRequired },
      { name: "divisions", path: "/divisions", canActivate: loggedInRequired }
    ]
  }
];
