import get from "lodash/get";
import * as React from "react";
import { Link, RouteNode } from "react-router5";
import { State } from "router5";

import Login from "../../pages/User/Login";
import {
  Container,
  Content,
  Header,
  Language,
  StyledLogo,
  Title,
  Top
} from "./styles";

export interface IUserProps {
  route: State;
}

class User extends React.Component<IUserProps, any> {
  public renderRoute = () => {
    const { route } = this.props;
    const routeName = get(route, "name", "");
    const childRouteName = routeName.split(".")[1];
    switch (childRouteName) {
      case "login": {
        return <Login />;
      }
      default: {
        return <div>FUCK ME</div>;
      }
    }
  };

  public render() {
    return (
      <Container>
        <Language />
        <Content>
          <Top>
            <Header>
              <Link routeName="home">
                <StyledLogo />
                <Title>Soul City S. C.</Title>
              </Link>
            </Header>
          </Top>
          {this.renderRoute()}
        </Content>
      </Container>
    );
  }
}

export default props => (
  <RouteNode nodeName="user">
    {({ route }) => <User route={route} {...props} />}
  </RouteNode>
);
