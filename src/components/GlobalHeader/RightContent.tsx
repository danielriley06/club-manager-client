import { Avatar, Dropdown, Icon, Menu, Spin, Tag } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";
import * as React from "react";
import styled from "styled-components";

import SelectLang from "../SelectLang";
import styles from "./index.less";

const AccountDropdown = styled.span`
  display: flex;
  align-items: center;
`;

// const Wrapper = styled.div`
//   position: relative;
//   display: flex;
//   flex: 1;
//   width: 100%;
//   height: 100%;
//   justify-content: flex-end;
//   align-items: center;
// `;

export interface IAgeGroup {
  id: string;
  title: string;
  maxAge: string;
}

export interface IClub {
  id: string;
  name: string;
}

export interface ITeam {
  id: string;
  name: string;
  level: string;
  gender: string;
  zipCode: string;
  timeZone: string;
  club: IClub;
  ageGroup: IAgeGroup;
}

export interface IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  clubRole: string;
  email: string;
  cellphone: string;
  gender: string;
  dateOfBirth: string;
  active: boolean;
  cellphoneVerified: boolean;
  emailVerified: boolean;
  invitedToDashboard: boolean;
  inviteAccepted: boolean;
  avatarLink: string;
  createdAt: string;
  updatedAt: string;
  isClubOwner: boolean;
  notify: boolean;
  teams: ITeam;
}

export interface IRightContentProps {
  currentUser: IUser;
  isMobile: boolean;
  collapsed: boolean;
  fetchingNotices?: boolean;
  logo?: React.ReactNode;
  onCollapse?: () => void;
  onMenuClick?: () => void;
  notices?: any;
  theme?: any;
}

export default class RightContent extends React.PureComponent<
  IRightContentProps,
  any
> {
  public getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: "",
          processing: "blue",
          urgent: "red",
          doing: "gold"
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, "type");
  }

  public render() {
    const { currentUser, onMenuClick, theme } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          Account Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          LOGOUTYES
        </Menu.Item>
      </Menu>
    );

    const HeaderAvatar = () => (
      <Avatar
        size="large"
        className={styles.avatar}
        src={`${process.env.REACT_APP_API_URL}${currentUser.avatarLink}`}
        alt="avatar"
      />
    );

    const HeaderInitialsAvatar = () => (
      <Avatar size="large" alt="avatar" className={styles.avatar}>
        {currentUser.firstName.charAt(0).toUpperCase()}
      </Avatar>
    );
    let className = styles.right;
    if (theme === "dark") {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        {currentUser.firstName ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <AccountDropdown>
                {`Hello, ${currentUser.firstName}`}
                {currentUser.avatarLink ? (
                  <HeaderAvatar />
                ) : (
                  <HeaderInitialsAvatar />
                )}
              </AccountDropdown>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <SelectLang className={styles.action} />
      </div>
    );
  }
}
