import { DatePicker, Form, Input, Modal, Select, Switch } from "antd";
import { FormComponentProps } from "antd/lib/form";
import i18next from "i18next";
import * as React from "react";
import { Mutation } from "react-apollo";

import { CREATE_USER } from "../../graphql/mutations/user";
import { USERS_QUERY } from "../../graphql/queries/user";
import { IUser } from "../../types/types";

const FormItem = Form.Item;
const SelectOption = Select.Option;

export interface IDirectoryModalProps extends FormComponentProps {
  t: i18next.TranslationFunction;
  closeModal: () => void;
  selectedUser: IUser | undefined;
  visible: boolean;
}

class DirectoryModal extends React.Component<IDirectoryModalProps> {
  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  public componentDidMount() {
    this.setBaseInfo();
  }

  public setBaseInfo = () => {
    const { selectedUser, form } = this.props;
    if (!selectedUser) {
      return;
    }
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = selectedUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  public handleSubmit = (event, createUser) => {
    const {
      closeModal,
      form: { validateFields }
    } = this.props;
    event.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        createUser({
          variables: {
            name: values.name,
            startDate: values.startDate.format("YYYY-MM-DD"),
            endDate: values.endDate.format("YYYY-MM-DD"),
            active: values.active || true
          },
          refetchQueries: [{ query: USERS_QUERY }]
        });
        closeModal();
      }
    });
  };

  public handleCancel = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  public generateModalTitle = (): string => {
    const { t, selectedUser } = this.props;
    const userTitle = t("app.user");
    const prefix = !selectedUser ? t("app.create") : t("app.edit");
    const baseTitle = !selectedUser
      ? userTitle
      : `${selectedUser.firstName} ${selectedUser.lastName}`;

    return `${prefix} ${baseTitle}`;
  };

  public render() {
    const {
      visible,
      t,
      form: { getFieldDecorator }
    } = this.props;
    const modalTitle = this.generateModalTitle();
    const isRequiredText = t("app.userForm.requiredField");
    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { data }) => (
          <Modal
            title={modalTitle}
            width={640}
            bodyStyle={{ padding: "28px 0 0" }}
            destroyOnClose={true}
            visible={visible}
            onCancel={this.handleCancel}
            cancelText={`${t("app.cancel")}`}
            onOk={event => this.handleSubmit(event, createUser)}
            okText={`${t("app.save")}`}
          >
            <Form onSubmit={event => this.handleSubmit(event, createUser)}>
              <FormItem
                label={`${t("app.userForm.firstName")}`}
                {...this.formLayout}
              >
                {getFieldDecorator("firstName", {
                  rules: [
                    {
                      required: true,
                      message: `${t(
                        "app.userForm.firstName"
                      )} ${isRequiredText}`
                    }
                  ]
                })(
                  <Input
                    placeholder={`${t("app.userForm.firstNamePlaceholder")}`}
                  />
                )}
              </FormItem>
              <FormItem
                label={`${t("app.userForm.lastName")}`}
                {...this.formLayout}
              >
                {getFieldDecorator("lastName", {
                  rules: [
                    {
                      required: true,
                      message: `${t("app.userForm.lastName")} ${isRequiredText}`
                    }
                  ]
                })(
                  <Input
                    placeholder={`${t("app.userForm.lastNamePlaceholder")}`}
                  />
                )}
              </FormItem>
              <FormItem
                label={`${t("app.userForm.email")}`}
                {...this.formLayout}
              >
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: `${t("app.userForm.email")} ${isRequiredText}`
                    }
                  ]
                })(
                  <Input
                    placeholder={`${t("app.userForm.emailPlaceholder")}`}
                  />
                )}
              </FormItem>
              <FormItem
                label={`${t("app.userForm.clubRole")}`}
                {...this.formLayout}
              >
                {getFieldDecorator("clubRole", {
                  rules: [
                    {
                      required: true,
                      message: `${t("app.userForm.clubRole")} ${isRequiredText}`
                    }
                  ]
                })(
                  <Select
                    placeholder={`${t("app.userForm.clubRolePlaceholder")}`}
                  >
                    <SelectOption value="player">
                      {t("app.userForm.playerOption")}
                    </SelectOption>
                    <SelectOption value="staff">
                      {t("app.userForm.staffOption")}
                    </SelectOption>
                    <SelectOption value="guardian">
                      {t("app.userForm.parentOption")}
                    </SelectOption>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={`${t("app.userForm.gender")}`}
                {...this.formLayout}
              >
                {getFieldDecorator("gender", {
                  rules: [
                    {
                      required: true,
                      message: `${t("app.userForm.gender")} ${isRequiredText}`
                    }
                  ]
                })(
                  <Select
                    placeholder={`${t("app.userForm.genderPlaceholder")}`}
                  >
                    <SelectOption value="male">
                      {t("app.userForm.maleOption")}
                    </SelectOption>
                    <SelectOption value="female">
                      {t("app.userForm.femaleOption")}
                    </SelectOption>
                    <SelectOption value="other">
                      {t("app.userForm.otherOption")}
                    </SelectOption>
                  </Select>
                )}
              </FormItem>
              <FormItem
                label={`${t("app.userForm.dateOfBirth")}`}
                {...this.formLayout}
              >
                {getFieldDecorator("dateOfBirth")(
                  <DatePicker
                    showTime={true}
                    placeholder={`${t("app.userForm.dateOfBirthPlaceholder")}`}
                    format="MM-DD-YYYY"
                    style={{ width: "100%" }}
                  />
                )}
              </FormItem>
              <FormItem {...this.formLayout} label="Assigned Teams">
                {getFieldDecorator("select-multiple")(
                  <Select
                    mode="multiple"
                    placeholder="Select one or more teams"
                  >
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
          </Modal>
        )}
      </Mutation>
    );
  }
}

export default Form.create()(DirectoryModal);
