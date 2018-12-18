import get from "lodash/get";
import * as React from "react";
import { InjectedRouterNode, Link, routeNode } from "react-router5";

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

export interface IUserProps extends InjectedRouterNode {}

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

export default routeNode<IUserProps>("user")(User);
