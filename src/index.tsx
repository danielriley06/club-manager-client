import "antd/dist/antd.css";
import * as React from "react";
import * as ReactDOM from "react-dom";

import Root from "./layouts/Root";
import { configureRouter } from "./router";
import configureStore from "./store";

const router = configureRouter();
const store = configureStore(router, window.APP_STATE);

router.start("/", () => {
  ReactDOM.render(
    <Root router={router} store={store} />,
    document.getElementById("root")
  );
});
