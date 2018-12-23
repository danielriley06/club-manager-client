import { Button, Card, Input, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

import get from "lodash/get";

import { Query } from "react-apollo";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { USERS_QUERY } from "../../graphql/queries/user";
import { IUser } from "../../types/types";
import styles from "./DirectoryList.less";
import DirectoryModal from "./DirectoryModal";
import DirectoryTable from "./DirectoryTable";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface IData {
  users: IUser[];
}

interface IVariables {
  page: number;
}

class AllUsersQuery extends Query<IData, IVariables> {}

export interface IDirectoryProps extends FormComponentProps, WithNamespaces {}

export interface IDirectoryState {
  visible: boolean;
  selectedUser: IUser | undefined;
}

class Directory extends React.PureComponent<IDirectoryProps, IDirectoryState> {
  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };
  public readonly state = {
    visible: false,
    selectedUser: undefined
  };

  public showModal = (e, item?: IUser): void => {
    this.setState({
      visible: true,
      selectedUser: item
    });
  };

  public closeModal = () => {
    this.setState({
      visible: false,
      selectedUser: undefined
    });
  };

  public deleteItem = id => {
    console.log(id);
  };

  public render() {
    const { t } = this.props;
    const { visible, selectedUser } = this.state;

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="staff">Staff</RadioButton>
          <RadioButton value="players">Players</RadioButton>
          <RadioButton value="other">Other</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="Search"
          onSearch={() => ({})}
        />
        <Button
          type="primary"
          style={{ marginBottom: 8, float: "right" }}
          icon="plus"
          onClick={this.showModal}
        >
          Create
        </Button>
      </div>
    );

    return (
      <div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: "0 32px 40px 32px" }}
            extra={extraContent}
          >
            <AllUsersQuery
              query={USERS_QUERY}
              variables={{
                page: 1
              }}
              notifyOnNetworkStatusChange={true}
            >
              {({ loading, error, data, fetchMore }) => {
                const users = get(data, "users", []);
                const usersCount = get(data, "usersCount", 0);
                return (
                  <DirectoryTable
                    users={users}
                    usersCount={usersCount}
                    loading={loading}
                    error={error}
                    fetchMore={fetchMore}
                    openEditModal={this.showModal}
                  />
                );
              }}
            </AllUsersQuery>
          </Card>
        </div>
        <DirectoryModal
          visible={visible}
          selectedUser={selectedUser}
          closeModal={this.closeModal}
          t={t}
        />
      </div>
    );
  }
}

export default withNamespaces("translation")(Directory);
