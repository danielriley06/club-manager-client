import { Drawer } from "antd";
import * as React from "react";

import { State } from "router5";
import SiderMenu from "./SiderMenu";

export interface ISiderMenuWrapperProps {
  route: State | null;
  collapsed: boolean;
  isMobile: boolean;
  onCollapse: () => void;
}

const SiderMenuWrapper: React.FunctionComponent<
  ISiderMenuWrapperProps
> = props => {
  const { isMobile, collapsed, onCollapse } = props;
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={onCollapse}
      style={{
        padding: 0,
        height: "100vh"
      }}
    >
      <SiderMenu {...props} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} />
  );
};

export default SiderMenuWrapper;
