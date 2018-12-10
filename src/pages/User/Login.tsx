import * as React from "react";
import { withRoute } from "react-router5";
import { Tabs } from "antd";

import { Main, StyledTabs } from "./styles";
import EmailLogin from "../../components/Login/EmailLogin";

const TabPane = Tabs.TabPane;

export interface LoginProps {}

class Login extends React.Component<LoginProps, any> {
  onTabChange = () => {};
  public render() {
    return (
      <Main>
        <StyledTabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="Email" key="1">
            <EmailLogin />
          </TabPane>
          <TabPane tab="Phone" key="2">
            Content of Tab Pane 2
          </TabPane>
        </StyledTabs>
      </Main>
    );
  }
}

export default withRoute(Login);
