import * as React from "react";
import { Link } from "react-router5";
import { State } from "router5";

import { connect } from "react-redux";
import childRouteSelector from "../../store/selectors/childRoute";
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
  childRoute: React.ReactNode;
}

const User: React.FunctionComponent<IUserProps> = ({ childRoute }) => (
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
      {childRoute}
    </Content>
  </Container>
);

export default connect(childRouteSelector("user"))(User);
