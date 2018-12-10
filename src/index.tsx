import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouterProvider, RouteNode } from "react-router5";
import { ApolloProvider } from "react-apollo";

import "./styles/index.css";
import { createGlobalStyle, ThemeProvider, theme } from "./styles";
import createRouter from "./router/createRouter";
import client from "./graphql/createClient";
import * as serviceWorker from "./serviceWorker";
import RootLayout from "./layouts/Root";

const router = createRouter();

router.start(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <RootLayout />
        </RouterProvider>
      </ThemeProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
