import { faAddressCard, faListAlt } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu } from "antd";
import get from "lodash/get";
import * as React from "react";
import { Link } from "react-router5";
import { State } from "router5";
import Logo from "../../assets/logo.svg";
import styled from "../../styles";

const { Sider } = Layout;

const MenuOption = styled("span")`
  font-family: "Open Sans", sans-serif;
  margin-left: 8px;
  font-size: 14px;
  display: ${(props: IMenuIcon) => (props.collapsed ? "none" : "inline")};
`;

const LogoFont = styled("span")`
  font-family: "Passion One", cursive;
  color: rgba(255, 255, 255, 1);
  margin-left: 16px;
  font-size: 40px;
  display: ${(props: IMenuIcon) => (props.collapsed ? "none" : "inline")};
`;

export const StyledLogoWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: ${(props: IMenuIcon) => (props.collapsed ? "18px" : "12px")};
  transition: all 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledLogo = styled(Logo)`
  height: 48px;
  flex-shrink: 0;
`;

export interface ISiderMenuProps {
  route: State | null;
  collapsed: boolean;
  onCollapse: () => void;
}

interface IMenuIcon {
  collapsed: boolean;
}

export default class SiderMenu extends React.Component<ISiderMenuProps, any> {
  public render() {
    const { collapsed, onCollapse, route } = this.props;
    const currentRouteName = get(route, "name", "");
    return (
      <Sider
        collapsible={true}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        trigger={null}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          zIndex: 10,
          boxShadow: "2px 0 6px rgba(0,21,41,.35)",
          transition: "all .2s"
        }}
      >
        <StyledLogoWrapper collapsed={collapsed}>
          <StyledLogo />
          <LogoFont collapsed={collapsed}>Soul City</LogoFont>
        </StyledLogoWrapper>
        <Menu theme="dark" mode="inline" selectedKeys={[currentRouteName]}>
          <Menu.Item key="dashboard.directory" title="Directory">
            <Link routeName="dashboard.directory">
              <FontAwesomeIcon
                style={{ fontSize: "14px" }}
                icon={faAddressCard}
              />
              <MenuOption collapsed={collapsed}>Directory</MenuOption>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.teams" title="Teams">
            <Link routeName="dashboard.teams">
              <FontAwesomeIcon
                style={{ fontSize: "14px" }}
                size="lg"
                icon={faUsers}
              />
              <MenuOption collapsed={collapsed}>Teams</MenuOption>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.divisions" title="Divisions">
            <Link routeName="dashboard.divisions">
              <FontAwesomeIcon
                style={{ fontSize: "14px" }}
                size="lg"
                icon={faListAlt}
              />
              <MenuOption collapsed={collapsed}>Divisions</MenuOption>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
