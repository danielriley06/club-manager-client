import { Badge, Icon, Popover, Spin, Tabs } from "antd";
import * as React from "react";

import classNames from "classnames";
import styles from "./index.less";
import List from "./NoticeList";

const { TabPane } = Tabs;

interface INoticeIcon {
  onItemClick: (item: any, tabProps: any) => void;
  onPopupVisibleChange?: () => void;
  onTabChange: (tabType: string) => void;
  onClear: (name: string) => void;
  clearClose?: boolean;
  loading?: boolean;
  locale?: any;
  children: any;
  className: string;
  count?: number;
  popupAlign: object;
  popupVisible?: boolean;
}

export default class NoticeIcon extends React.PureComponent<INoticeIcon, any> {
  public static Tab = TabPane;

  public static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    loading: false,
    clearClose: false,
    locale: {
      emptyText: "No notifications",
      clear: "Clear"
    },
    emptyImage:
      "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
  };

  private popoverRef = React.createRef<Popover & HTMLElement>();

  public onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    const { clickClose } = item;
    const clickedItem = item || "";
    const clickedTabProps = tabProps || "";
    onItemClick(clickedItem, clickedTabProps);
    if (clickClose) {
      this.popoverRef.current!.click();
    }
  };

  public onClear = name => {
    const { onClear, clearClose } = this.props;
    onClear(name);
    if (clearClose) {
      this.popoverRef.current!.click();
    }
  };

  public onTabChange = tabType => {
    const { onTabChange } = this.props;
    const clickedTabType = tabType || "";
    onTabChange(clickedTabType);
  };

  public getNotificationBox() {
    const { children, loading, locale } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, child => {
      const { list, title, name } = child.props;
      const formattedTitle =
        list && list.length > 0 ? `${title} (${list.length})` : title;
      return (
        <TabPane tab={formattedTitle} key={name}>
          <List
            {...child.props}
            data={child.props.list}
            onClick={item => this.onItemClick(item, child.props)}
            onClear={() => this.onClear(child.props.name)}
            title={child.props.title}
            locale={locale}
          />
        </TabPane>
      );
    });

    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }

  public render() {
    const {
      className,
      count,
      popupAlign,
      popupVisible,
      onPopupVisibleChange
    } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = <Icon type="bell" className={styles.icon} />;
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge
          count={count}
          style={{ boxShadow: "none" }}
          className={styles.badge}
        >
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ("popupVisible" in this.props) {
      Object.assign({ visible: popupVisible }, popoverProps);
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        trigger="click"
        arrowPointAtCenter={true}
        align={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
        ref={this.popoverRef} // eslint-disable-line
      >
        {trigger}
      </Popover>
    );
  }
}
