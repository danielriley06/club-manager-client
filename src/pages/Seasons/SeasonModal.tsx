import { DatePicker, Form, Input, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { Mutation } from "react-apollo";

import CREATE_SEASON from "../../graphql/mutations/season";
import SEASONS_QUERY from "../../graphql/queries/season";

const FormItem = Form.Item;

export interface ISeasonModalProps extends FormComponentProps {
  handleDivisionModal: (
    e: React.FormEvent<HTMLInputElement>,
    type: string | undefined,
    current: object | undefined
  ) => void;
  current: object;
  type: string | null;
  visible: boolean;
}

class SeasonModal extends React.Component<ISeasonModalProps> {
  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  public handleSubmit = (event, createSeason) => {
    const {
      handleDivisionModal,
      form: { validateFields }
    } = this.props;
    event.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        createSeason({
          variables: {
            name: values.name,
            startDate: values.startDate.format("YYYY-MM-DD"),
            endDate: values.endDate.format("YYYY-MM-DD"),
            active: values.active || true
          },
          refetchQueries: [{ query: SEASONS_QUERY }]
        });
        handleDivisionModal(event, undefined, undefined);
      }
    });
  };

  public handleCancel = event => {
    const { handleDivisionModal } = this.props;
    handleDivisionModal(event, undefined, undefined);
  };

  public fetchParentId = () => {
    const { current } = this.props;
    return get(current, "id", null);
  };

  public generateModalTitle = () => {
    const { type } = this.props;
    const hasParentId = !isEmpty(this.fetchParentId());

    if (type === "edit") {
      if (hasParentId) {
        return "Edit Subdivision";
      }
      return "Edit Division";
    }
    if (type === "create" && hasParentId) {
      return "Create Subdivision";
    }
    return "Create Division";
  };

  public render() {
    const {
      visible,
      type,
      current,
      form: { getFieldDecorator }
    } = this.props;
    const modalTitle = this.generateModalTitle();
    return (
      <Mutation mutation={CREATE_SEASON}>
        {(createSeason, { data }) => (
          <Modal
            title={modalTitle}
            width={640}
            bodyStyle={{ padding: "28px 0 0" }}
            destroyOnClose={true}
            visible={visible}
            onCancel={this.handleCancel}
            onOk={event => this.handleSubmit(event, createSeason)}
          >
            <Form onSubmit={event => this.handleSubmit(event, createSeason)}>
              <FormItem label="Name" {...this.formLayout}>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Season name is required" }
                  ],
                  initialValue: `${
                    type === "create" ? "" : get(current, "name")
                  }`
                })(<Input placeholder="Name of season" />)}
              </FormItem>
              <FormItem label="Start Date" {...this.formLayout}>
                {getFieldDecorator("startDate", {
                  initialValue: `${
                    type === "create" ? "" : get(current, "startDate")
                  }`
                })(
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Click to select"
                  />
                )}
              </FormItem>
              <FormItem label="End Date" {...this.formLayout}>
                {getFieldDecorator("endDate", {
                  initialValue: `${
                    type === "create" ? "" : get(current, "endDate")
                  }`
                })(
                  <DatePicker
                    format="YYYY-MM-DD"
                    placeholder="Click to select"
                  />
                )}
              </FormItem>
            </Form>
          </Modal>
        )}
      </Mutation>
    );
  }
}

export default Form.create()(SeasonModal);
