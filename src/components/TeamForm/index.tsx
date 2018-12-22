import * as React from "react";

import { Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import get from "lodash/get";

import AgeGroupSelect from "../AgeGroupSelect";
import DivisionSelect from "../DivisionSelect";
import SeasonSelect from "../SeasonSelect";

const FormItem = Form.Item;

export interface ITeamFormProps extends FormComponentProps {
  currentTeam: ITeamAttributes;
  withSubmitButton?: boolean;
  createTeam?: () => void;
}

interface IAgeGroupAttributes {
  id?: string;
  title: string;
}

interface IDivisionAttributes {
  id?: string;
  name: string;
}

interface ISeasonAttributes {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

interface ITeamAttributes {
  name?: string;
  level?: string;
  gender?: string;
  zipCode?: string;
  timeZone?: string;
  season?: ISeasonAttributes;
  division?: IDivisionAttributes;
  ageGroup?: IAgeGroupAttributes;
}

class TeamForm extends React.Component<ITeamFormProps, any> {
  public static defaultProps = {
    currentTeam: {}
  };

  public formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  public render() {
    const {
      currentTeam,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <Form>
        <FormItem label="Team Name" {...this.formLayout}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Team name is required" }],
            initialValue: get(currentTeam, "name", "")
          })(<Input placeholder="e.g. Warkittens" />)}
        </FormItem>
        <FormItem label="Season" {...this.formLayout}>
          {getFieldDecorator("seasonId", {
            rules: [{ required: true, message: "Season is required" }],
            initialValue: get(currentTeam, "season.id", "")
          })(<SeasonSelect placeholder="Select a season" />)}
        </FormItem>
        <FormItem label="Division" {...this.formLayout}>
          {getFieldDecorator("divisionId", {
            rules: [{ required: true, message: "Division is required" }],
            initialValue: get(currentTeam, "clubRole", "")
          })(<DivisionSelect placeholder="Select a division" />)}
        </FormItem>
        <FormItem label="Age Group" {...this.formLayout}>
          {getFieldDecorator("ageGroupId", {
            initialValue: get(currentTeam, "ageGroup.id", "")
          })(<AgeGroupSelect placeholder="Select an age group" />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(TeamForm);
