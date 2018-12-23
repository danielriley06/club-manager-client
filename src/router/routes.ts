import { State } from "router5";
import { IRoute } from "../types/routes";
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

export const routes: IRoute[] = [
  {
    name: "user",
    path: "/user",
    forwardTo: "user.login",
    loadComponent: () => import("../layouts/User"),
    children: [
      {
        name: "login",
        path: "/login",
        canActivate: authenticationRequired,
        loadComponent: () => import("../pages/User/Login")
      }
    ]
  },
  {
    name: "dashboard",
    path: "/dashboard",
    forwardTo: "dashboard.directory",
    loadComponent: () => import("../layouts/Dashboard"),
    children: [
      {
        name: "directory",
        path: "/directory",
        canActivate: loggedInRequired,
        loadComponent: () => import("../pages/Directory")
      },
      {
        name: "teams",
        path: "/teams",
        canActivate: loggedInRequired,
        loadComponent: () => import("../pages/Teams")
      },
      {
        name: "divisions",
        path: "/divisions",
        canActivate: loggedInRequired,
        loadComponent: () => import("../pages/Divisions")
      },
      {
        name: "seasons",
        path: "/seasons",
        canActivate: loggedInRequired,
        loadComponent: () => import("../pages/Seasons")
      },
      {
        name: "settings",
        path: "/settings",
        canActivate: loggedInRequired,
        loadComponent: () => import("../pages/Settings/Account/Info"),
        children: [
          {
            name: "account",
            path: "/account",
            canActivate: loggedInRequired,
            loadComponent: () => import("../pages/Settings/Account/BaseView")
          }
        ]
      }
    ]
  }
];
