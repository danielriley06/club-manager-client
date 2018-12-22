import * as React from "react";
import { Mutation, Query } from "react-apollo";

import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Icon,
  Input,
  List,
  Menu,
  Modal
} from "antd";
import get from "lodash/get";

import DivisionSelect from "../../components/DivisionSelect";
import TeamForm from "../../components/TeamForm";
import CREATE_TEAM from "../../graphql/mutations/team";
import GET_TEAMS from "../../graphql/queries/team";
import styles from "./DirectoryList.less";

const { Search } = Input;

export interface ITeamsProps {}

export interface ITeamsState {
  visible: boolean;
  done: boolean;
  contactType: string;
  current: object;
}

class Teams extends React.Component<ITeamsProps, ITeamsState> {
  public state = {
    visible: false,
    done: false,
    contactType: "email",
    current: {}
  };

  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  public formRef;

  public saveFormRef = formRef => {
    this.formRef = formRef;
  };

  public showModal = () => {
    this.setState({
      visible: true,
      current: {}
    });
  };

  public showEditModal = item => {
    this.setState({
      visible: true,
      current: item
    });
  };

  public handleDone = () => {
    this.setState({
      done: false,
      visible: false
    });
  };

  public handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  public setContactType = value => {
    this.setState({
      contactType: value
    });
  };

  public onSelectChange = value => {
    console.log(value);
  };

  public handleSubmit = e => {
    e.preventDefault();
    const { form, createTeam } = this.formRef.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log({ ...fieldsValue });
      createTeam({
        variables: {
          ...fieldsValue
        }
      });
      this.setState({
        done: true
      });
    });
  };

  public render() {
    const { visible, done, current } = this.state;

    const DirectoryAvatar = ({ item: { name } }) => {
      return (
        <Avatar size={64} style={{ verticalAlign: "middle" }}>
          {name[0].toUpperCase()}
        </Avatar>
      );
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <DivisionSelect
          onChange={this.onSelectChange}
          mode="multiple"
          placeholder="Filter by 1 or more divisions"
        />
        <Search
          className={styles.extraContentSearch}
          placeholder="Search"
          onSearch={() => ({})}
        />
      </div>
    );

    const ListContent = () => <div className={styles.listContent} />;

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="assign">Assign</Menu.Item>
            <Menu.Item key="deactivate">Deactivate</Menu.Item>
          </Menu>
        }
      >
        <a>
          Options <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <Query query={GET_TEAMS} variables={{ page: 1 }}>
        {({ loading, error, data }) => {
          const teams = get(data, "teams");
          const total = get(data, "teams_total");
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <div>
              <div className={styles.standardList}>
                <Card
                  className={styles.listCard}
                  bordered={false}
                  title="Teams"
                  style={{ marginTop: 24 }}
                  bodyStyle={{ padding: "0 32px 40px 32px" }}
                  extra={extraContent}
                >
                  <Button
                    type="dashed"
                    style={{ width: "100%", marginBottom: 8 }}
                    icon="plus"
                    onClick={this.showModal}
                  >
                    Create
                  </Button>
                  <List
                    size="large"
                    rowKey="id"
                    loading={loading}
                    pagination={{
                      pageSize: 25,
                      total
                    }}
                    dataSource={teams}
                    renderItem={team => {
                      const { division } = team;
                      const divisionName = get(division, "name", "Unassigned");
                      const ancestorName = get(division, "ancestorName");
                      return (
                        <List.Item
                          key={`${team.id}-listItem`}
                          actions={[
                            <a
                              key={`${team.id}-listItemteamEdit`}
                              onClick={e => {
                                e.preventDefault();
                                this.showEditModal(team);
                              }}
                            >
                              Edit
                            </a>,
                            <MoreBtn
                              current={team}
                              key={`${team.id}-listItemMoreBtn`}
                            />
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<DirectoryAvatar item={team} />}
                            title={<a href={team.href}>{team.name}</a>}
                            description={`${
                              ancestorName ? `${ancestorName} => ` : ""
                            }${divisionName}`}
                          />
                          <ListContent />
                        </List.Item>
                      );
                    }}
                  />
                </Card>
              </div>
              <Modal
                title="Create Team"
                className={styles.standardListForm}
                width={640}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                bodyStyle={
                  done ? { padding: "72px 0" } : { padding: "28px 0 0" }
                }
                destroyOnClose={true}
                visible={visible}
              >
                <Mutation mutation={CREATE_TEAM}>
                  {(createTeam, { data }) => (
                    <TeamForm
                      currentTeam={current}
                      wrappedComponentRef={this.saveFormRef}
                      createTeam={createTeam}
                    />
                  )}
                </Mutation>
              </Modal>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Teams;
