import { Tabs } from "antd";
import * as React from "react";
import { withRoute } from "react-router5";

import EmailLogin from "../../components/Login/EmailLogin";
import { Main, StyledTabs } from "./styles";

const TabPane = Tabs.TabPane;

export interface LoginProps {}

class Login extends React.Component<LoginProps, any> {
  public onTabChange = () => {};
  public render() {
    return (
      <Main>
        <StyledTabs defaultActiveKey="1" onChange={this.onTabChange}>
          <TabPane tab="Email" key="1">
            <EmailLogin />
          </TabPane>
          <TabPane tab="Phone" key="2">
            <EmailLogin />
          </TabPane>
        </StyledTabs>
      </Main>
    );
  }
}

export default withRoute(Login);
