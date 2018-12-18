import { Card, Collapse } from "antd";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { Query } from "react-apollo";

import { DIVISIONS_QUERY } from "../../graphql/queries/division";
import DivisionListChildren from "./DivisionListChildren";
import DivisionModal from "./DivisionModal";
import DivisionPanelHeader from "./DivisionPanelHeader";

class DivisionList extends React.PureComponent {
  public state = {
    visible: false,
    type: null,
    current: {}
  };

  public handleDivisionModal = (e, type = "create", current) => {
    const { visible } = this.state;

    e.stopPropagation();
    this.setState({
      visible: !visible,
      type,
      current
    });
  };

  public render() {
    const { visible, type, current = {} } = this.state;

    return (
      <Query query={DIVISIONS_QUERY}>
        {({ loading, error, data }) => {
          const divisions = get(data, "divisions");
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <div title="Divisions">
              <Card>
                <Collapse bordered={false}>
                  {divisions.map(division => {
                    return (
                      <Collapse.Panel
                        header={
                          <DivisionPanelHeader
                            division={division}
                            handleDivisionModal={this.handleDivisionModal}
                          />
                        }
                        key={division.id}
                        showArrow={!isEmpty(division.children)}
                        disabled={isEmpty(division.children)}
                      >
                        {!isEmpty(division.children) && (
                          <DivisionListChildren
                            parentId={division.id}
                            division={division}
                            handleDivisionModal={this.handleDivisionModal}
                          />
                        )}
                      </Collapse.Panel>
                    );
                  })}
                </Collapse>
              </Card>
              <DivisionModal
                visible={visible}
                current={current}
                type={type}
                handleDivisionModal={this.handleDivisionModal}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default DivisionList;
