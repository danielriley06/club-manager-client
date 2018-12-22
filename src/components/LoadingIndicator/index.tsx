import { Spin } from "antd";
import * as React from "react";

import styled from "../../styles/index";

export const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ILoadingIndicatorProps {}

const LoadingIndicator: React.FunctionComponent<
  ILoadingIndicatorProps
> = () => (
  <LoadingWrapper>
    <Spin size="large" />
  </LoadingWrapper>
);

export default LoadingIndicator;
