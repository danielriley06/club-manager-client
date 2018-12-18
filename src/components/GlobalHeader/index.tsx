import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Debounce from "lodash-decorators/debounce";
import * as React from "react";
import { Link } from "react-router5";
import Logo from "../../assets/logo.svg";
import styled from "../../styles";

export const StyledLogo = styled(Logo)`
  height: 48px;
  flex-shrink: 0;
`;

const Header = styled.div`
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  display: flex;
`;

const HeaderLogo = styled<any>(Link)`
  height: 64px;
  display: flex;
  align-items: center;
  padding-left: 18px;
  cursor: pointer;
  font-size: 20px;
  img {
    display: inline-block;
    vertical-align: middle;
  }
`;

const Trigger = styled.span`
  font-size: 24px;
  height: 64px;
  cursor: pointer;
  transition: all 0.3s, padding 0s;
  padding: 14px 24px;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`;

export interface IGlobalHeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  logo: React.ReactNode;
  onCollapse: () => void;
}

export default class GlobalHeader extends React.Component<
  IGlobalHeaderProps,
  any
> {
  @Debounce(600)
  public triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    window.dispatchEvent(event);
  }

  public toggle = () => {
    console.log("hello");
    const { onCollapse } = this.props;
    onCollapse();
    this.triggerResizeEvent();
  };

  public render() {
    const { isMobile, collapsed } = this.props;
    return (
      <Header>
        {isMobile && (
          <HeaderLogo routeName="dashboard" key="logo">
            <StyledLogo />
          </HeaderLogo>
        )}
        {isMobile && (
          <Trigger onClick={this.toggle}>
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              rotation={collapsed ? 180 : undefined}
            />
          </Trigger>
        )}
      </Header>
    );
  }
}
