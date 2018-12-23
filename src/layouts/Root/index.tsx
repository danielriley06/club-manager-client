import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import { Store } from "redux";
import { Router } from "router5";

import createClient from "../../graphql/createClient";
import "../../locales/i18n";
import { theme, ThemeProvider } from "../../styles";
import App from "../App";

interface IRootLayoutProps {
  router: Router;
  store: Store;
  children?: React.ReactNode;
}

const Root: React.FunctionComponent<IRootLayoutProps> = ({
  router,
  store,
  children
}) => (
  <Provider store={store}>
    <ApolloProvider client={createClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </ApolloProvider>
  </Provider>
);

export default Root;
