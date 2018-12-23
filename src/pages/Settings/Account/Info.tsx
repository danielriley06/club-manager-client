import { Menu } from "antd";
import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import childRouteSelector from "../../../store/selectors/childRoute";
import styles from "./Info.less";

const { Item } = Menu;

enum Mode {
  Inline = "inline",
  VerticalLeft = "vertical-left",
  VerticalRight = "vertical-right",
  Horizontal = "horizontal"
}

interface IInfoProps extends WithNamespaces {
  childRoute: React.ReactNode;
}

interface IInfoState {
  readonly mode: Mode | undefined;
  readonly selectKey: string;
}

class Info extends React.PureComponent<IInfoProps, IInfoState> {
  public readonly state = {
    mode: Mode.Inline,
    selectKey: "base"
  };

  public menuMap = {
    base: this.props.t("app.settings.menuMap.base")
  };

  private wrapperRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  public getMenu = () => {
    return Object.keys(this.menuMap).map(item => (
      <Item key={item}>{this.menuMap[`${item}`]}</Item>
    ));
  };

  public getRightTitle = () => {
    const { selectKey } = this.state;
    return this.menuMap[selectKey];
  };

  public selectKey = ({ key }) => {
    this.setState({
      selectKey: key
    });
  };

  public resize = () => {
    if (!this.wrapperRef) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = Mode.Inline;
      const { offsetWidth } = this.wrapperRef.current!;
      if (offsetWidth < 641 && offsetWidth > 400) {
        mode = Mode.Horizontal;
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = Mode.Horizontal;
      }
      this.setState({
        mode
      });
    });
  };

  public render() {
    const { childRoute } = this.props;
    const { mode, selectKey } = this.state;

    return (
      <div className={styles.main} ref={this.wrapperRef}>
        <div className={styles.leftmenu}>
          <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
            {this.getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{this.getRightTitle()}</div>
          {childRoute}
        </div>
      </div>
    );
  }
}

export default connect(childRouteSelector("dashboard.settings"))(
  withNamespaces("translation")(Info)
);
