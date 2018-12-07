import { createRouter } from "router5";
import loggerPlugin from "router5/plugins/logger";
import browserPlugin from "router5/plugins/browser";

import routes from "./routes";

const routerOptions = {
  allowNotFound: false,
  autoCleanUp: true,
  defaultRoute: "home",
  defaultParams: {},
  queryParams: {
    arrayFormat: "default",
    nullFormat: "default",
    booleanFormat: "default"
  },
  queryParamsMode: "default",
  trailingSlashMode: "default",
  strictTrailingSlash: false,
  caseSensitive: false
};

export default function configureRouter() {
  const router = createRouter(routes, routerOptions)
    .usePlugin(loggerPlugin)
    .usePlugin(
      browserPlugin({
        useHash: true
      })
    );

  return router;
}
