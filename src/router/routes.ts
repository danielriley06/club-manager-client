import { Route, State } from "router5";
import { userIsLoggedIn } from "../utils/authentication";

export const loggedInRequired = () => (toState: State, fromState: State) => {
  if (userIsLoggedIn()) {
    return true;
  }
  return Promise.reject({ redirect: { name: "user" } });
};

export const authenticationRequired = () => (
  toState: State,
  fromState: State
) => {
  if (!userIsLoggedIn()) {
    return true;
  }
  return Promise.reject({ redirect: { name: "dashboard" } });
};

export const routes: Route[] = [
  {
    children: [
      { name: "login", path: "/login", canActivate: authenticationRequired },
      {
        canActivate: authenticationRequired,
        name: "register",
        path: "/register"
      }
    ],
    forwardTo: "user.login",
    name: "user",
    path: "/user"
  },
  {
    children: [
      { name: "directory", path: "/directory", canActivate: loggedInRequired },
      { name: "teams", path: "/teams", canActivate: loggedInRequired },
      { name: "divisions", path: "/divisions", canActivate: loggedInRequired },
      { name: "seasons", path: "/seasons", canActivate: loggedInRequired }
    ],
    forwardTo: "dashboard.directory",
    name: "dashboard",
    path: "/dashboard"
  }
];
