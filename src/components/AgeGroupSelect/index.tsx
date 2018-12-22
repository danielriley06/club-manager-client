import { Select } from "antd";
import get from "lodash/get";
import * as React from "react";
import { Query } from "react-apollo";

import { AGE_GROUPS_QUERY } from "../../graphql/queries/ageGroup";

const { Option } = Select;

export interface IAgeGroupSelectProps {
  placeholder?: string;
  onChange: (value: string | null) => void;
}

export interface IAgeGroupSelectState {
  selected: string[] | string;
}

class AgeGroupSelect extends React.PureComponent<
  IAgeGroupSelectProps,
  IAgeGroupSelectState
> {
  public static defaultProps = {
    placeholder: "Select age group",
    onChange: (value: string | null) => console.log(value)
  };

  public handleChange = (value: string) => {
    const { onChange } = this.props;
    onChange(value);
  };

  public render() {
    const { placeholder } = this.props;
    return (
      <Query query={AGE_GROUPS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const ageGroups = get(data, "ageGroups");
          return (
            <Select
              placeholder={placeholder}
              onChange={this.handleChange}
              style={{ width: "300px" }}
            >
              {ageGroups.map(({ id, title }) => (
                <Option value={id} key={id}>
                  {title}
                </Option>
              ))}
            </Select>
          );
        }}
      </Query>
    );
  }
}

export default AgeGroupSelect;
