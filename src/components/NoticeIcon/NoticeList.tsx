import { Avatar, List } from "antd";
import classNames from "classnames";
import * as React from "react";
import styles from "./NoticeList.less";

const NoticeList: React.FunctionComponent<any> = ({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
  showClear = true
}) => {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List
        className={styles.list}
        dataSource={data}
        renderItem={(item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === "string" ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
              item.avatar
            )
          ) : null;

          return (
            <List.Item className={itemCls} key={item.key || i}>
              <List.Item.Meta
                className={styles.meta}
                avatar={<span className={styles.iconElement}>{leftIcon}</span>}
                title={
                  <div className={styles.title}>
                    {item.title}
                    <div className={styles.extra}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div
                      className={styles.description}
                      title={item.description}
                    >
                      {item.description}
                    </div>
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      {showClear ? (
        <div className={styles.clear} onClick={onClear}>
          {locale.clear} {title}
        </div>
      ) : null}
    </div>
  );
};

export default NoticeList;
