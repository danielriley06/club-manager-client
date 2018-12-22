import createRouter, { Router } from "router5";
import browserPlugin from "router5-plugin-browser";
import loggerPlugin from "router5-plugin-logger";

import { routes } from "./routes";

export default function configureRouter(): Router {
  const router: Router = createRouter(routes, {
    defaultRoute: "user"
  });
  router.usePlugin(loggerPlugin);
  router.usePlugin(browserPlugin());

  return router;
}
