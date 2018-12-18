import { Layout } from "antd";
import enquire from "enquire.js";
import get from "lodash/get";
import * as React from "react";
import { InjectedRouterNode, routeNode } from "react-router5";

import { Query } from "react-apollo";
import Logo from "../../assets/logo.svg";
import GlobalHeader from "../../components/GlobalHeader";
import SiderMenuWrapper from "../../components/SiderMenu";
import { CURRENT_USER_QUERY } from "../../graphql/queries/user";
import Directory from "../../pages/Directory";
import DivisionList from "../../pages/Divisions";
import Teams from "../../pages/Teams";
import styled from "../../styles/index";

const { Content } = Layout;

export const StyledLogo = styled(Logo)`
  height: 120px;
  vertical-align: top;
  margin-bottom: 16px;
`;

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  public renderRef;

  public enquireHandler;

  public readonly state: IDashboardState = {
    rendering: true,
    isMobile: false,
    collapsed: false
  };

  public componentDidMount() {
    this.renderRef = window.requestAnimationFrame(() => {
      this.setState({
        rendering: false
      });
    });
    this.enquireHandler = enquire.register(
      "only screen and (max-width: 767.99px)",
      {
        match: () => {
          this.setState({
            isMobile: true
          });
        },
        unmatch: () => {
          this.setState({
            isMobile: false
          });
        }
      }
    );
  }

  public componentWillUnmount() {
    cancelAnimationFrame(this.renderRef);
    enquire.unregister(this.enquireHandler);
  }

  public onCollapse = (): void => {
    console.log("oh hi!");
    this.setState(state => ({
      collapsed: !state.collapsed
    }));
  };

  public getLayoutStyle = () => {
    const { isMobile, collapsed } = this.state;
    if (!isMobile) {
      return {
        paddingLeft: collapsed ? "80px" : "256px"
      };
    }
    return null;
  };

  public renderRoutes = () => {
    const { route } = this.props;
    const routeName = get(route, "name", "");
    const childRouteName = routeName.split(".")[1];

    if (childRouteName === "directory") {
      return <Directory />;
    }

    if (childRouteName === "teams") {
      return <Teams />;
    }

    if (childRouteName === "divisions") {
      return <DivisionList />;
    }

    return <div>Well Shit</div>;
  };

  public render() {
    const { isMobile, collapsed } = this.state;
    const { route } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <Layout>
              <SiderMenuWrapper
                isMobile={isMobile}
                collapsed={collapsed}
                onCollapse={this.onCollapse}
                route={route}
              />
              <Layout
                style={{
                  ...this.getLayoutStyle(),
                  minHeight: "100vh"
                }}
              >
                <GlobalHeader
                  isMobile={isMobile}
                  onCollapse={this.onCollapse}
                  collapsed={collapsed}
                  logo={StyledLogo}
                />
                <Content
                  style={{
                    margin: "24px 24px 0"
                  }}
                >
                  {this.renderRoutes()}
                </Content>
              </Layout>
            </Layout>
          );
        }}
      </Query>
    );
  }
}

export interface IDashboardProps extends InjectedRouterNode {}

export interface IDashboardState {
  rendering: boolean;
  isMobile: boolean;
  collapsed: boolean;
}

export default routeNode<IDashboardProps>("dashboard")(Dashboard);
