import { Avatar, Button, Dropdown, Icon, Menu, Table } from "antd";
import capitalize from "lodash/capitalize";
import isEmpty from "lodash/isEmpty";
import React from "react";

import AccountIndicators from "../../components/AccountIndicators";

const { Column } = Table;
const { Item, SubMenu } = Menu;

const setRowKey = ({ id }) => id;

const AvatarColumn = (text, { firstName, lastName, avatarLink }) => {
  if (isEmpty(avatarLink)) {
    return (
      <Avatar size={64} shape="square" style={{ verticalAlign: "middle" }}>
        {`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
      </Avatar>
    );
  }
  return (
    <Avatar
      size={64}
      shape="square"
      style={{ verticalAlign: "middle" }}
      src={`${process.env.API_URL}${avatarLink}`}
      alt="avatar"
    />
  );
};

const NameColumn = (text, { firstName, lastName, clubRole }) => (
  <span>
    <h3>{`${firstName} ${lastName}`}</h3>
    <p>{capitalize(clubRole)}</p>
  </span>
);

const TeamsColumn = teams => {
  switch (teams.length) {
    case 0:
      return <span>None</span>;
    case 1:
      return <span>{teams[0].name}</span>;
    default:
      return (
        <Dropdown
          overlay={
            <Menu>
              {teams.map(team => (
                <Item>{team.name}</Item>
              ))}
            </Menu>
          }
        >
          <span>
            `$
            {teams.length} teams` <Icon type="down" />
          </span>
        </Dropdown>
      );
  }
};

const ActionColumnMenu = (
  <Menu>
    <Item key="1">Edit</Item>
    <Item key="2">Assign</Item>
    <SubMenu title="Message">
      <Item key="3">SMS</Item>
      <Item key="4">Email</Item>
    </SubMenu>
  </Menu>
);

const ActionColumn = () => (
  <span>
    <Dropdown overlay={ActionColumnMenu} placement="bottomLeft">
      <Button style={{ marginLeft: 8 }}>
        Actions <Icon type="down" />
      </Button>
    </Dropdown>
  </span>
);

const DirectoryTable = ({ users, usersCount, fetchMore, loading, error }) => (
  <Table
    rowKey={setRowKey}
    dataSource={users}
    loading={loading}
    pagination={{
      total: usersCount,
      pageSize: 25,
      onChange: page =>
        fetchMore({
          variables: {
            page
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              users: [...prev.users, ...fetchMoreResult.users]
            });
          }
        })
    }}
  >
    <Column key="avatar" width={64} render={AvatarColumn} />
    <Column key="name" title="Name" render={NameColumn} />
    <Column key="email" title="Email" dataIndex="email" />
    <Column key="cellphone" title="Phone" dataIndex="cellphone" />
    <Column
      key="teams"
      title="Assigned Teams"
      dataIndex="teams"
      render={TeamsColumn}
    />
    <Column key="status" title="Status" render={AccountIndicators} />
    <Column key="action" align="right" render={ActionColumn} />
  </Table>
);

export default DirectoryTable;
