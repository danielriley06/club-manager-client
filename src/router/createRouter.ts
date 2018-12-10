import createRouter, { Router as Router5, State } from "router5";
import loggerPlugin from "router5/plugins/logger";
import browserPlugin from "router5/plugins/browser";

import { routes } from "./routes";

export default function configureRouter(): any {
  const router = createRouter(routes, {
    defaultRoute: "user"
  })
    .usePlugin(loggerPlugin)
    .usePlugin(browserPlugin());

  return router;
}
