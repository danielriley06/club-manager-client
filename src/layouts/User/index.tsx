import * as React from "react";
import { State } from "router5";
import { Link, routeNode } from "react-router5";

import {
  Container,
  Content,
  Top,
  Header,
  Title,
  StyledLogo,
  Language
} from "./styles";
import Login from "../../pages/User/Login";

export interface UserProps {
  route?: State;
}

class User extends React.Component<UserProps, any> {
  renderRoute = () => {
    const childRouteName = this.props.route.name.split(".")[1];
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

export default routeNode("user")(User);
