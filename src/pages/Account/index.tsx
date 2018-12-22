import { Menu } from "antd";
import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import router from "umi/router";
import GridContent from "../../components/PageWrapper/GridContent";
import { IUser } from "../../types/types";
import styles from "./Info.less";

const { Item } = Menu;
const menuMap = {
  base: (
    <FormattedMessage
      id="app.settings.menuMap.basic"
      defaultMessage="Basic Settings"
    />
  ),
  security: (
    <FormattedMessage
      id="app.settings.menuMap.security"
      defaultMessage="Security Settings"
    />
  ),
  binding: (
    <FormattedMessage
      id="app.settings.menuMap.binding"
      defaultMessage="Account Binding"
    />
  ),
  notification: (
    <FormattedMessage
      id="app.settings.menuMap.notification"
      defaultMessage="New Message Notification"
    />
  )
};
const getMenuKey = (props: IAccountWrapperProps) =>
  location.pathname.replace(`${props.match.path}/`, "");

interface IAccountWrapperProps extends WithNamespaces {
  currentUser: IUser;
}

interface IAccountWrapperState {
  readonly mode: string;
  readonly selectKey: string;
  readonly menuMap: object;
}

class Info extends React.Component<IAccountWrapperProps, IAccountWrapperState> {
  public static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, "");
    selectKey = state.menuMap[selectKey] ? selectKey : "base";
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }
  constructor(props) {
    super(props);
    const { match, location } = props;

    this.state = {
      mode: "inline",
      menuMap,
      selectKey: menuMap[key] ? key : "base"
    };
  }

  public componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  public getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  public getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  public selectKey = ({ key }) => {
    router.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key
    });
  };

  public resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = "inline";
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }
      this.setState({
        mode
      });
    });
  };

  public render() {
    const { children, currentUser } = this.props;
    if (!currentUser.userid) {
      return "";
    }
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={this.selectKey}
            >
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default withNamespaces()(Info);
