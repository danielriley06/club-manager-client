import * as React from "react";
import { InjectedRouterNode, routeNode } from "react-router5";

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
`;

export interface IRootLayoutProps extends InjectedRouterNode {
  children?: React.ReactNode;
}

class Root extends React.Component<IRootLayoutProps> {
  public renderRouteNode = () => {
    const topRouteName = this.props.route!.name.split(".")[0];
    switch (topRouteName) {
      case "user": {
        return <User />;
      }
      case "dashboard": {
        return <Dashboard />;
      }
      default: {
        return <div>FUCK ME</div>;
      }
    }
  };

  public render() {
    return (
      <RootWrapper>
        <GlobalStyle />
        {this.renderRouteNode()}
      </RootWrapper>
    );
  }
}

export default routeNode<IRootLayoutProps>("root")(Root);