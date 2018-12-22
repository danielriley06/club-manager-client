import { Select } from "antd";
import filter from "lodash/filter";
import find from "lodash/find";
import get from "lodash/get";
import includes from "lodash/includes";
import * as React from "react";
import { Query } from "react-apollo";

import { ALL_DIVISIONS_QUERY } from "../../graphql/queries/division";

const { Option, OptGroup } = Select;

export interface IDivisionSelectProps {
  mode?: string;
  placeholder?: string;
  onChange?: (value: string | null) => void;
}

export interface IDivisionSelectState {
  selected: string[] | string;
}

function findDivisionAncestor(ancestorId, divisions): any {
  const ancestor = find(divisions, { id: ancestorId as any });
  return ancestor;
}

function divisionSelectOption(division, divisions, selected) {
  const { id, name, ancestry, children = [] } = division;
  if (children.length === 0) {
    const isSelected = includes(selected, id);
    const ancestorObj = findDivisionAncestor(ancestry, divisions);
    const displayName = isSelected ? `${ancestorObj.name} - ` : null;
    return (
      <Option value={id} key={id}>
        {displayName}
        {name}
      </Option>
    );
  }
  return (
    <OptGroup label={name} key={id}>
      {children.map(child => divisionSelectOption(child, divisions, selected))}
    </OptGroup>
  );
}

class DivisionSelect extends React.PureComponent<
  IDivisionSelectProps,
  IDivisionSelectState
> {
  public static defaultProps = {
    mode: "default",
    placeholder: "Select division"
  };
  public state = {
    selected: []
  };

  public handleChange = (value: string[] | string) => {
    const { mode } = this.props;
    this.setState({ selected: value });
    if (mode === "default") {
      this.props.onChange!(value as string);
    }
  };

  public render() {
    const { mode, placeholder } = this.props;
    const { selected } = this.state;
    return (
      <Query query={ALL_DIVISIONS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const divisions = get(data, "allDivisions");
          const updatedDivisions = divisions.slice();
          const filteredDivisions = updatedDivisions.map(division => {
            const { children = [] } = division;
            const updatedDivision = division;
            if (children.length > 0) {
              updatedDivision.children = filter(
                updatedDivision.children,
                child => !includes(selected, child.id)
              );
            }
            return updatedDivision;
          });
          const divisionData =
            mode === "default" ? divisions : filteredDivisions;
          console.log(selected, divisionData);

          return (
            <Select
              mode={mode}
              placeholder={placeholder}
              onChange={this.handleChange}
              style={{ width: "300px" }}
            >
              {divisionData.map(division =>
                divisionSelectOption(division, divisions, selected)
              )}
            </Select>
          );
        }}
      </Query>
    );
  }
}

export default DivisionSelect;
