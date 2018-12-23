import logger from "redux-logger";
import { router5Middleware } from "redux-router5";
import { Router } from "router5";

export function createMiddleware(router: Router) {
  const middleware = [router5Middleware(router)];

  // Use logger in dev, client-side
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    middleware.push(logger);
  }
  return middleware;
}
