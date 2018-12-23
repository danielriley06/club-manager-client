import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import get from "lodash/get";
import * as React from "react";
import { Query } from "react-apollo";

import { withNamespaces, WithNamespaces } from "react-i18next";
import AvatarUpload from "../../../components/Inputs/AvatarUpload";
import PhoneInput from "../../../components/Inputs/PhoneInput";
import { CURRENT_USER_QUERY } from "../../../graphql/queries/user";
import { IUser } from "../../../types/types";
import styles from "./BaseView.less";

const FormItem = Form.Item;

const validatorPhone = (rule, value, callback) => {
  const values = value.split("-");
  if (!values[0]) {
    callback("Please input your area code!");
  }
  if (!values[1]) {
    callback("Please input your mobileNumber number!");
  }
  callback();
};

interface IBaseView extends FormComponentProps, WithNamespaces {
  currentUser: IUser;
}

class BaseView extends React.Component<IBaseView, any> {
  public getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatarLink) {
      return `${process.env.API_URL}${currentUser.avatarLink}`;
    }
    const url =
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";
    return url;
  }

  public handleSubmit = values => {
    console.log(values);
  };

  public render() {
    const {
      form: { getFieldDecorator },
      t
    } = this.props;
    return (
      <div className={styles.baseView}>
        <Query query={CURRENT_USER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const currentUser = get(data, "currentUser");

            return (
              <>
                <div className={styles.left}>
                  <Form
                    layout="vertical"
                    onSubmit={this.handleSubmit}
                    hideRequiredMark={true}
                  >
                    <FormItem label={t("app.settings.base.form.email")}>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message: t("app.settings.base.form.emailMessage")
                          }
                        ],
                        initialValue: get(currentUser, "email", "")
                      })(<Input />)}
                    </FormItem>
                    <FormItem label={t("app.settings.base.form.firstName")}>
                      {getFieldDecorator("firstName", {
                        rules: [
                          {
                            required: true,
                            message: t(
                              "app.settings.base.form.firstNameMessage"
                            )
                          }
                        ],
                        initialValue: get(currentUser, "firstName", "")
                      })(<Input />)}
                    </FormItem>
                    <FormItem label={t("app.settings.base.form.lastName")}>
                      {getFieldDecorator("lastName", {
                        rules: [
                          {
                            required: true,
                            message: t("app.settings.base.form.lastNameMessage")
                          }
                        ],
                        initialValue: get(currentUser, "lastName", "")
                      })(<Input />)}
                    </FormItem>
                    <FormItem label={t("app.settings.base.form.mobileNumber")}>
                      {getFieldDecorator("mobileNumber", {
                        rules: [
                          {
                            required: true,
                            message: t("app.settings.base.form.lastNameMessage")
                          },
                          { validator: validatorPhone }
                        ],
                        initialValue: get(currentUser, "mobileNumber", "")
                      })(<PhoneInput />)}
                    </FormItem>
                    <Button type="primary">
                      {t("app.settings.base.form.update")}
                    </Button>
                  </Form>
                </div>
                <div className={styles.right}>
                  <AvatarUpload avatarLink={currentUser.avatarLink} />
                </div>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withNamespaces("translation")(Form.create()(BaseView));
