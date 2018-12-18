import createRouter, { Router } from "router5";
import browserPlugin from "router5/plugins/browser";
import loggerPlugin from "router5/plugins/logger";

import { routes } from "./routes";

export default function configureRouter(): Router {
  const router: Router = createRouter(routes, {
    defaultRoute: "user"
  })
    .usePlugin(loggerPlugin)
    .usePlugin(browserPlugin());

  return router;
}
