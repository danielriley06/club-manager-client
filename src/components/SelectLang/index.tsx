import { Dropdown, Icon, Menu } from "antd";
import classNames from "classnames";
import React, { PureComponent } from "react";
import styles from "./index.less";

interface ISelectLangProps {
  className: string;
  onLanguageClick: (key: string) => void;
}

export default class SelectLang extends PureComponent<ISelectLangProps, any> {
  public changLang = ({ key }) => {
    console.log(key);
    const { onLanguageClick } = this.props;
    onLanguageClick(key);
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
        <Menu.Item key="en">
          <span role="img" aria-label="English">
            🇺🇸
          </span>{" "}
          English
        </Menu.Item>
        <Menu.Item key="es">
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
