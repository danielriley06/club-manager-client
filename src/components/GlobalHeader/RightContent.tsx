import { Avatar, Dropdown, Icon, Menu, Spin, Tag } from "antd";
import groupBy from "lodash/groupBy";
import moment from "moment";
import * as React from "react";
import { Link, Route } from "react-router5";
import styled from "styled-components";

import { WithNamespaces, withNamespaces } from "react-i18next";
import { Router } from "router5";
import { removeAuthorizationToken } from "../../utils/authentication";
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

export interface IRightContentProps extends WithNamespaces {
  currentUser: IUser;
  isMobile: boolean;
  collapsed: boolean;
  fetchingNotices?: boolean;
  logo?: React.ReactNode;
  onCollapse?: () => void;
  onMenuClick?: () => void;
  notices?: any;
  theme?: any;
  router: Router;
}

class Content extends React.PureComponent<IRightContentProps, any> {
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

  public onMenuClick = ({ key }) => {
    const { router } = this.props;
    if (key === "logout") {
      removeAuthorizationToken();
      router.navigate("user.login", {}, { reload: true });
    }
  };

  public changeLanguage = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  public render() {
    const { currentUser, theme, t } = this.props;
    const menu = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
        <Menu.Item key="userinfo">
          <Link routeName="dashboard.settings.account">
            <Icon type="setting" />
            {t("app.header.accountSettingsButton")}
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          {t("app.header.logOutButton")}
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
                {`${t("app.header.greeting")}, ${currentUser.firstName}`}
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
        <SelectLang
          onLanguageClick={this.changeLanguage}
          className={styles.action}
        />
      </div>
    );
  }
}

const RightContent = withNamespaces("translation")(Content);

export default props => (
  <Route>{({ router }) => <RightContent router={router} {...props} />}</Route>
);
