import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "router5";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import createRouter from "./router/createRouter";
import client from "./graphql/createClient";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const router = createRouter(true);

const app = (
  <RouterProvider router={router}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </RouterProvider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
