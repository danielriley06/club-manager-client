import * as React from "react";
import styled from "../../styles";

const PageHeaderWrapper = styled.div`
  margin: -24px -24px 0;
  padding: 16px 32px 0 32px;
  background: rgb(255, 255, 255);
`;

export interface IPageHeaderProps {}

export default class PageHeader extends React.Component<IPageHeaderProps, any> {
  public render() {
    const { children } = this.props;
    return <PageHeaderWrapper>{children}</PageHeaderWrapper>;
  }
}
