import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { RouterProvider } from "react-router5";

import createClient from "./graphql/createClient";
import Root from "./layouts/Root";
import createRouter from "./router/createRouter";
import { theme, ThemeProvider } from "./styles";

const router = createRouter();

router.start(() => {
  ReactDOM.render(
    <ApolloProvider client={createClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <Root />
        </RouterProvider>
      </ThemeProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );
});
