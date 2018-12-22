import get from "lodash/get";
import * as React from "react";
import { Query } from "react-apollo";

import { Button, Layout, List } from "antd";
import LoadingIndicator from "../../components/LoadingIndicator";
import PageHeader from "../../components/PageHeader";
import SEASONS_QUERY from "../../graphql/queries/season";
import styled from "../../styles";
import { ISeason } from "../../types/types";
import styles from "./CardList.less";
import SeasonCard from "./SeasonCard";
import SeasonModal from "./SeasonModal";

const { Content } = Layout;

const SeasonListWrapper = styled.div`
  display: flex;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export interface ISeasonListProps {}

export interface ISeasonListState {
  visible: boolean;
  type: string | null;
  current: object | ISeason;
}

export default class SeasonList extends React.Component<
  ISeasonListProps,
  ISeasonListState
> {
  public state = {
    visible: false,
    type: null,
    current: {}
  };

  public toggleSeasonModal = (e, type = "create", current = {}) => {
    e.stopPropagation();

    this.setState(({ visible }) => ({
      type,
      current,
      visible: !visible
    }));
  };

  public render() {
    const { visible, current, type } = this.state;
    return (
      <SeasonListWrapper>
        <Query query={SEASONS_QUERY}>
          {({ loading, error, data }) => {
            const seasons: ISeason[] = get(data, "seasons");
            if (loading) {
              return <LoadingIndicator />;
            }
            if (error) return <p>Error :(</p>;

            return (
              <Layout>
                <PageHeader>
                  <HeaderWrapper>
                    <Button
                      type="primary"
                      style={{ marginBottom: 8 }}
                      icon="plus"
                      onClick={this.toggleSeasonModal}
                    >
                      Create
                    </Button>
                  </HeaderWrapper>
                </PageHeader>
                <Content
                  style={{
                    margin: "24px"
                  }}
                >
                  <List
                    rowKey="id"
                    loading={loading}
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    dataSource={["", ...seasons]}
                    renderItem={season =>
                      season ? (
                        <List.Item key={season.id}>
                          <SeasonCard season={season} />
                        </List.Item>
                      ) : (
                        <List.Item>
                          <Button
                            type="dashed"
                            icon="plus"
                            className={styles.newButton}
                            onClick={this.toggleSeasonModal}
                          >
                            Create Season
                          </Button>
                        </List.Item>
                      )
                    }
                  />
                </Content>
              </Layout>
            );
          }}
        </Query>
        <SeasonModal
          visible={visible}
          current={current}
          type={type}
          handleDivisionModal={this.toggleSeasonModal}
        />
      </SeasonListWrapper>
    );
  }
}
