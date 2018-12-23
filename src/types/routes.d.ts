import { Route } from "router5";

export interface IRoute extends Route {
  loadComponent?: () => React.ReactNode;
  children?: IRoute[];
}
