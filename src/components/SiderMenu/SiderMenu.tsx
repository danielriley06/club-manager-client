import { faAddressCard, faListAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faSignature,
  faStopwatch,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Layout, Menu } from "antd";
import get from "lodash/get";
import * as React from "react";
import { Link } from "react-router5";
import { State } from "router5";
import styled from "../../styles";
import SiderLogo from "./SiderLogo";

const { Sider } = Layout;

const MenuOption = styled("span")`
  font-family: "Open Sans", sans-serif;
  margin-left: 8px;
  font-size: 16px;
  display: ${(props: IMenuIcon) => (props.collapsed ? "none" : "inline")};
  letter-spacing: 0.25px;
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
          boxShadow: "4px 0 4px 0 rgba(50,50,93,.1)",
          transition: "all .2s"
        }}
      >
        <SiderLogo collapsed={collapsed} />
        <Divider style={{ background: "rgba(234, 238, 245, 0.08)" }} />
        <Menu theme="dark" mode="inline" selectedKeys={[currentRouteName]}>
          <Menu.Item key="dashboard.directory" title="Directory">
            <Link routeName="dashboard.directory">
              <FontAwesomeIcon
                style={{ fontSize: "18px" }}
                size="lg"
                icon={faAddressCard}
                fixedWidth={true}
              />
              <MenuOption collapsed={collapsed}>Directory</MenuOption>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.teams" title="Teams">
            <Link routeName="dashboard.teams">
              <FontAwesomeIcon
                style={{ fontSize: "18px" }}
                size="lg"
                icon={faUsers}
                fixedWidth={true}
              />
              <MenuOption collapsed={collapsed}>Teams</MenuOption>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.divisions" title="Divisions">
            <Link routeName="dashboard.divisions">
              <FontAwesomeIcon
                style={{ fontSize: "18px" }}
                size="lg"
                icon={faListAlt}
                fixedWidth={true}
              />
              <MenuOption collapsed={collapsed}>Divisions</MenuOption>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.seasons" title="Seasons">
            <Link routeName="dashboard.seasons">
              <FontAwesomeIcon
                style={{ fontSize: "18px" }}
                size="lg"
                icon={faStopwatch}
                fixedWidth={true}
              />
              <MenuOption collapsed={collapsed}>Seasons</MenuOption>
            </Link>
          </Menu.Item>
          <Menu.Item key="dashboard.registrations" title="Registrations">
            <Link routeName="dashboard.registrations">
              <FontAwesomeIcon
                style={{ fontSize: "18px" }}
                size="lg"
                icon={faSignature}
                fixedWidth={true}
              />
              <MenuOption collapsed={collapsed}>Registrations</MenuOption>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
