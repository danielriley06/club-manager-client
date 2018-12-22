import { Button, Card, Collapse } from "antd";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import * as React from "react";
import { Query } from "react-apollo";

import LoadingIndicator from "../../components/LoadingIndicator";
import { DIVISIONS_QUERY } from "../../graphql/queries/division";
import { IDivision } from "../../types/types";
import DivisionListChildren from "./DivisionListChildren";
import DivisionModal from "./DivisionModal";
import DivisionPanelHeader from "./DivisionPanelHeader";

export interface ITeamsProps {}

export interface ITeamsState {
  visible: boolean;
  type: string | null;
  current: object | IDivision;
}

class DivisionList extends React.PureComponent<ITeamsProps, ITeamsState> {
  public state = {
    visible: false,
    type: null,
    current: {}
  };

  public toggleDivisionModal = () => {
    this.setState(({ visible }) => ({
      visible: !visible
    }));
  };

  public handleDivisionModal = (e, type = "create", current = {}) => {
    e.stopPropagation();

    this.setState(({ visible }) => ({
      type,
      current,
      visible: !visible
    }));
  };

  public render() {
    const { visible, type, current = {} } = this.state;

    const extraContent = (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 8, float: "right" }}
          icon="plus"
          onClick={this.handleDivisionModal}
        >
          Create
        </Button>
      </div>
    );

    return (
      <Query query={DIVISIONS_QUERY}>
        {({ loading, error, data }) => {
          const divisions: IDivision[] = get(data, "divisions");
          if (loading) {
            return <LoadingIndicator />;
          }
          if (error) return <p>Error :(</p>;

          return (
            <div title="Divisions">
              <Card
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: "0 32px 40px 32px" }}
                bordered={false}
                extra={extraContent}
              >
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
                        key={`${division.id}`}
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
