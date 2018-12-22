import * as React from "react";
import styled from "../../styles";

const FluidWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
`;

const FixedWrapper = styled(FluidWrapper)`
  max-width: 1200px;
  margin: 0 auto;
`;

export interface IGridContentProps {
  children: React.ReactNode;
  contentWidth?: string;
}

export default class GridContent extends React.PureComponent<
  IGridContentProps,
  any
> {
  public defaultProps = { contentWidth: "Fluid" };

  public render() {
    const { children, contentWidth } = this.props;
    const GridContentWrapper =
      contentWidth === "Fixed" ? FixedWrapper : FluidWrapper;
    return <GridContentWrapper>{children}</GridContentWrapper>;
  }
}
