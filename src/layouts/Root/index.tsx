import * as React from "react";
import { RouteNode } from "react-router5";
import { State } from "router5";

import { createGlobalStyle } from "../../styles";
import Dashboard from "../Dashboard";
import User from "../User";
import { RootWrapper } from "./styles";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    text-rendering: optimizelegibility;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif !important;
    width: 100%;
    height: 100%;
  }

  input[type=text], textarea {
    transition: all 0.30s ease-in-out;
    outline: none;
    border: 1px solid #DDDDDD;
  }
   
  input[type=text]:focus, textarea:focus {
    outline: 0;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  input[type=text]:hover, textarea:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }

  &::placeholder {
    color: #a3b1bf;
  }

  .ant-layout {
    min-height: 100vh;
  }

  .ant-card {
    box-shadow: 0 2px 4px 0 rgba(50,50,93,.1);
    border-radius: 4px;
  }

  .ant-card-bordered {
    border: none;
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: transparent;
    border-right: 6px solid #1890ff;
    font-weight: bold !important;
  }

  .ant-table-thead > tr > th {
    background: #fff;
  }
`;

export interface IRootLayoutProps {
  children?: React.ReactNode;
  route: State;
}

const Root = ({ route }) => {
  const topRouteName = route.name.split(".")[0];
  switch (topRouteName) {
    case "user": {
      return (
        <RootWrapper>
          <GlobalStyle />
          <User />
        </RootWrapper>
      );
    }
    case "dashboard": {
      return (
        <RootWrapper>
          <GlobalStyle />
          <Dashboard />
        </RootWrapper>
      );
    }
    default: {
      return <div>FUCK ME</div>;
    }
  }
};

export default props => (
  <RouteNode nodeName="">
    {({ route }) => <Root route={route} {...props} />}
  </RouteNode>
);
