import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Router } from "router5";

import { createMiddleware } from "./middleware";
import { rootReducer } from "./reducers";

export default function configureStore(router: Router, initialState = {}) {
  const composeEnhancers = composeWithDevTools({});
  const middleware = createMiddleware(router);

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
