import createRouter, { Router, State } from "router5";
import browserPlugin from "router5-plugin-browser";
import loggerPlugin from "router5-plugin-logger";

import { asyncComponentLoader } from "./middleware";
import { routes } from "./routes";

export function configureRouter(): Router {
  const router: Router = createRouter(routes, {
    defaultRoute: "user",
    trailingSlashMode: "always"
  });
  router.usePlugin(loggerPlugin);
  router.usePlugin(
    browserPlugin({
      useHash: false
    })
  );

  router.useMiddleware(asyncComponentLoader(routes));

  return router;
}

export const startRouter: any = (router: Router, initialRoute: State) =>
  asyncComponentLoader(routes)()(initialRoute).then(() =>
    router.start(initialRoute)
  );
