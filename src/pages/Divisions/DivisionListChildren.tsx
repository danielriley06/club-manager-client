import { Collapse } from "antd";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { Query } from "react-apollo";

import { DIVISION_CHILDREN_QUERY } from "../../graphql/queries/division";
import DivisionPanelHeader from "./DivisionPanelHeader";

const DivisionListChildren = ({
  parentId,
  handleDivisionModal,
  division,
  ...restProps
}) => (
  <Query query={DIVISION_CHILDREN_QUERY} variables={{ parentId }}>
    {({ loading, error, data }) => {
      const divisions = get(data, "divisionChildren");
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <Collapse bordered={false} {...restProps}>
          {divisions.map(childDivision => (
            <Collapse.Panel
              header={
                <DivisionPanelHeader
                  division={childDivision}
                  handleDivisionModal={handleDivisionModal}
                />
              }
              key={childDivision.id}
              showArrow={!isEmpty(childDivision.children)}
              disabled={isEmpty(childDivision.children)}
            >
              {!isEmpty(childDivision.children) && (
                <DivisionListChildren
                  parentId={childDivision.id}
                  division={childDivision}
                  handleDivisionModal={handleDivisionModal}
                />
              )}
            </Collapse.Panel>
          ))}
        </Collapse>
      );
    }}
  </Query>
);

export default DivisionListChildren;
