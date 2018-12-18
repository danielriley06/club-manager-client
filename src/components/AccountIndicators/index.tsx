import {
  faBell,
  faChessKing,
  faUserCheck,
  faUserClock,
  faUserLock,
  faUserSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import React from "react";
import styled from "styled-components";

const determineAccountStatus = ({
  invitedToDashboard,
  inviteAccepted,
  active
}) => {
  if (inviteAccepted && active) {
    return "active";
  }
  if (!inviteAccepted && invitedToDashboard && active) {
    return "pending";
  }
  if (inviteAccepted && invitedToDashboard && !active) {
    return "inactive";
  }
  return "notInvited";
};

const AccountIndicatorsWrapper = styled.span`
  display: flex;

  svg {
    margin-right: 4px;
  }
`;

export interface IAccountIndicatorIcons {
  [key: string]: () => React.ReactNode;
}

const accountIndicatorIcons: IAccountIndicatorIcons = {
  active: () => (
    <Tooltip title="Dashboard Member" key="active">
      <FontAwesomeIcon icon={faUserCheck} color="#06DA03" size="lg" />
    </Tooltip>
  ),
  pending: () => (
    <Tooltip title="Pending Invite" key="pendingStatus">
      <FontAwesomeIcon icon={faUserClock} color="#3366ff" size="lg" />
    </Tooltip>
  ),
  inactive: () => (
    <Tooltip title="Blocked Account" key="inactiveStatus">
      <FontAwesomeIcon icon={faUserLock} color="#ff0000" size="lg" />
    </Tooltip>
  ),
  notInvited: () => (
    <Tooltip title="Not Yet Invited" key="notInvitedStatus">
      <FontAwesomeIcon icon={faUserSlash} color="#a39193" size="lg" />
    </Tooltip>
  ),
  isClubOwner: () => (
    <Tooltip title="Full Dashboard Permissions" key="isClubOwnerStatus">
      <FontAwesomeIcon icon={faChessKing} color="#FFD700" size="lg" />
    </Tooltip>
  ),
  notify: () => (
    <Tooltip title="Recieves Notifications" key="notifyStatus">
      <FontAwesomeIcon icon={faBell} color="#555" size="lg" />
    </Tooltip>
  )
};

const AccountIndicators = account => {
  const currentIndicators: string[] = [];
  const accountStatus = determineAccountStatus(account);

  currentIndicators.push(accountStatus);
  if (account.notify) {
    currentIndicators.push("notify");
  }

  return (
    <AccountIndicatorsWrapper>
      {currentIndicators.map(indicator => accountIndicatorIcons[indicator]())}
    </AccountIndicatorsWrapper>
  );
};

export default AccountIndicators;
