import { Layout } from "antd";
import enquire from "enquire.js";
import get from "lodash/get";
import * as React from "react";
import { RouteNode } from "react-router5";
import { State } from "router5";

import { Query } from "react-apollo";
import Logo from "../../assets/logo.svg";
import GlobalHeader from "../../components/GlobalHeader";
import LoadingIndicator from "../../components/LoadingIndicator";
import SiderMenuWrapper from "../../components/SiderMenu";
import { CURRENT_USER_QUERY } from "../../graphql/queries/user";
import Directory from "../../pages/Directory";
import DivisionList from "../../pages/Divisions";
import SeasonsList from "../../pages/Seasons";
import Teams from "../../pages/Teams";
import styled from "../../styles/index";

const { Content } = Layout;

export const StyledLogo = styled(Logo)`
  height: 120px;
  vertical-align: top;
  margin-bottom: 16px;
`;

export interface IDashboardProps {
  route: State;
}

export interface IDashboardState {
  rendering: boolean;
  isMobile: boolean;
  collapsed: boolean;
}

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

    if (childRouteName === "seasons") {
      return <SeasonsList />;
    }

    return <div>Well Shit</div>;
  };

  public render() {
    const { isMobile, collapsed } = this.state;
    const { route } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingIndicator />;
          }
          if (error) {
            return <p>Error :(</p>;
          }
          const { currentUser } = data;
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
                  currentUser={currentUser}
                  {...this.props}
                />
                <Content
                  style={{
                    margin: "24px"
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

export default props => (
  <RouteNode nodeName="dashboard">
    {({ route }) => <Dashboard route={route} {...props} />}
  </RouteNode>
);
