import { Form, Input, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { Mutation } from "react-apollo";

import CREATE_DIVISION from "../../graphql/mutations/division";
import { DIVISIONS_QUERY } from "../../graphql/queries/division";

const FormItem = Form.Item;
const { TextArea } = Input;

export interface IDivisionModalProps extends FormComponentProps {
  handleDivisionModal: (
    e: React.FormEvent<HTMLInputElement>,
    type: string | undefined,
    current: object | undefined
  ) => void;
  current: object;
  type: string | null;
  visible: boolean;
}

class DivisionModal extends React.Component<IDivisionModalProps> {
  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  public handleSubmit = (event, addDivision) => {
    const {
      handleDivisionModal,
      form: { validateFields }
    } = this.props;
    const parentId = this.fetchParentId();
    event.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        addDivision({
          variables: {
            name: values.name,
            description: values.description,
            parentId
          },
          refetchQueries: [{ query: DIVISIONS_QUERY }]
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
      <Mutation mutation={CREATE_DIVISION}>
        {(createDivision, { data }) => (
          <Modal
            title={modalTitle}
            width={640}
            bodyStyle={{ padding: "28px 0 0" }}
            destroyOnClose={true}
            visible={visible}
            onCancel={this.handleCancel}
            onOk={event => this.handleSubmit(event, createDivision)}
          >
            <Form onSubmit={event => this.handleSubmit(event, createDivision)}>
              <FormItem label="Name" {...this.formLayout}>
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Division name is required" }
                  ],
                  initialValue: `${
                    type === "create" ? "" : get(current, "name")
                  }`
                })(<Input placeholder="Name of division" />)}
              </FormItem>
              <FormItem label="Description" {...this.formLayout}>
                {getFieldDecorator("description", {
                  initialValue: `${
                    type === "create" ? "" : get(current, "description")
                  }`
                })(<TextArea placeholder="Short description if needed" />)}
              </FormItem>
            </Form>
          </Modal>
        )}
      </Mutation>
    );
  }
}

export default Form.create()(DivisionModal);
