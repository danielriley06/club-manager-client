import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Switch
} from "antd";
import { FormComponentProps } from "antd/lib/form";

import * as React from "react";
import { Query } from "react-apollo";

import get from "lodash/get";

import { USERS_QUERY } from "../../graphql/queries/user";
import styles from "./DirectoryList.less";
import DirectoryTable from "./DirectoryTable";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search } = Input;

export interface IDirectoryProps extends FormComponentProps {}

class Directory extends React.PureComponent<IDirectoryProps> {
  public state = {
    visible: false,
    done: false,
    contactType: "email",
    current: undefined
  };

  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  public showModal = () => {
    this.setState({
      visible: true,
      current: undefined
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

  public handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true
      });
      console.log({ ...fieldsValue });
    });
  };

  public deleteItem = id => {
    console.log(id);
  };

  public setContactType = value => {
    this.setState({
      contactType: value
    });
  };

  public render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { visible, done, contactType, current = {} } = this.state;

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: "Save",
          onOk: this.handleSubmit,
          onCancel: this.handleCancel
        };

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
      </div>
    );

    const prefixSelector = (
      <Select
        style={{ width: 70 }}
        onChange={this.setContactType}
        dropdownMatchSelectWidth={false}
        placeholder="Type"
      >
        <SelectOption value="email">Email</SelectOption>
        <SelectOption value="cellphone">Cellphone</SelectOption>
      </Select>
    );

    const getModalContent = () => (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="First Name" {...this.formLayout}>
          {getFieldDecorator("firstName", {
            rules: [{ required: true, message: "First Name is required" }],
            initialValue: get(current, "firstName", "")
          })(<Input placeholder="e.g. Bobby" />)}
        </FormItem>
        <FormItem label="Last Name" {...this.formLayout}>
          {getFieldDecorator("lastName", {
            rules: [{ required: true, message: "Last Name is required" }],
            initialValue: get(current, "lastName", "")
          })(<Input placeholder="e.g. Jones" />)}
        </FormItem>
        <FormItem label="Contact" {...this.formLayout}>
          {getFieldDecorator(contactType, {
            rules: [{ required: true, message: "Email is required" }],
            initialValue: get(current, "email", "")
          })(<Input addonBefore={prefixSelector} placeholder="Email" />)}
        </FormItem>
        <FormItem label="Club Role" {...this.formLayout}>
          {getFieldDecorator("clubRole", {
            rules: [{ required: true, message: "Club role is required" }],
            initialValue: get(current, "clubRole", "")
          })(
            <Select placeholder="Select a role...">
              <SelectOption value="player">Player</SelectOption>
              <SelectOption value="staff">Staff</SelectOption>
              <SelectOption value="guardian">Parent/Guardian</SelectOption>
            </Select>
          )}
        </FormItem>
        <FormItem label="Gender" {...this.formLayout}>
          {getFieldDecorator("gender", {
            initialValue: get(current, "gender", ""),
            rules: [
              {
                required: true,
                message: "Gender is required"
              }
            ]
          })(
            <Select placeholder="Select a gender...">
              <SelectOption value="male">Male</SelectOption>
              <SelectOption value="female">Female</SelectOption>
              <SelectOption value="other">Other</SelectOption>
            </Select>
          )}
        </FormItem>
        <FormItem label="Select a date of birth..." {...this.formLayout}>
          {getFieldDecorator("dateOfBirth")(
            <DatePicker
              showTime={true}
              placeholder="01-01-1990"
              format="MM-DD-YYYY"
              style={{ width: "100%" }}
            />
          )}
        </FormItem>
        <FormItem {...this.formLayout} label="Assigned Teams">
          {getFieldDecorator("select-multiple")(
            <Select mode="multiple" placeholder="Select one or more teams">
              <SelectOption value="red">Red</SelectOption>
              <SelectOption value="green">Green</SelectOption>
              <SelectOption value="blue">Blue</SelectOption>
            </Select>
          )}
        </FormItem>
        <FormItem {...this.formLayout} label="Invite to Dashboard?">
          {getFieldDecorator("switch", { valuePropName: "checked" })(
            <Switch />
          )}
        </FormItem>
      </Form>
    );
    return (
      <div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="Directory"
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
            <Query
              query={USERS_QUERY}
              variables={{
                page: 1
              }}
              notifyOnNetworkStatusChange={true}
            >
              {({ loading, error, data, fetchMore }) => {
                const users = get(data, "users");
                const usersCount = get(data, "usersCount");
                return (
                  <DirectoryTable
                    users={users}
                    usersCount={usersCount}
                    loading={loading}
                    error={error}
                    fetchMore={fetchMore}
                  />
                );
              }}
            </Query>
          </Card>
        </div>
        <Modal
          title="Create Account"
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: "72px 0" } : { padding: "28px 0 0" }}
          destroyOnClose={true}
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Directory);
