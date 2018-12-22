import { Dropdown, Icon, Menu } from "antd";
import classNames from "classnames";
import React, { PureComponent } from "react";
import styles from "./index.less";

interface ISelectLangProps {
  className: string;
}

export default class SelectLang extends PureComponent<ISelectLangProps, any> {
  public changLang = ({ key }) => {
    console.log(key);
  };

  public render() {
    const { className } = this.props;
    // const selectedLang = getLocale();
    const langMenu = (
      <Menu
        className={styles.menu}
        // selectedKeys={[selectedLang]}
        onClick={this.changLang}
      >
        <Menu.Item key="en-US">
          <span role="img" aria-label="English">
            🇺🇸
          </span>{" "}
          English
        </Menu.Item>
        <Menu.Item key="pt-BR">
          <span role="img" aria-label="Spanish">
            🇲🇽
          </span>{" "}
          Spanish
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <Icon
          type="global"
          className={classNames(styles.dropDown, className)}
        />
      </Dropdown>
    );
  }
}
