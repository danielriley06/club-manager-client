import { Select } from "antd";
import get from "lodash/get";
import * as React from "react";
import { Query } from "react-apollo";

import { SEASONS_QUERY } from "../../graphql/queries/season";

const { Option } = Select;

export interface ISeasonSelectProps {
  placeholder?: string;
  onChange: (value: string | null) => void;
}

export interface ISeasonSelectState {
  selected: string[] | string;
}

class SeasonSelect extends React.PureComponent<
  ISeasonSelectProps,
  ISeasonSelectState
> {
  public static defaultProps = {
    onChange: (value: string) => console.log(value),
    placeholder: "Select season"
  };

  public handleChange = (value: string) => {
    const { onChange } = this.props;
    onChange(value);
  };

  public render() {
    const { placeholder } = this.props;
    return (
      <Query query={SEASONS_QUERY}>
        {({ loading, error, data }) => {
          if (error) return <p>Error :(</p>;
          const seasons = get(data, "seasons", []);
          console.log(seasons); // tslint:disable-line

          return (
            <Select
              loading={loading}
              placeholder={placeholder}
              onChange={this.handleChange}
              style={{ width: "300px" }}
            >
              {seasons.map(({ id, name }) => (
                <Option value={id}>{name}</Option>
              ))}
            </Select>
          );
        }}
      </Query>
    );
  }
}

export default SeasonSelect;
