import Tabs, { TabsProps } from "antd/lib/tabs";

import styled from "../../styles";
import { media } from "../../styles/styleUtils";

export const Main = styled.div`
  width: 368px;
  margin: 0 auto;
  ${media.md`
    width: 95%;
  `}
`;

export const StyledTabs = styled<any & TabsProps>(Tabs)`
  .ant-tabs-bar {
    border-bottom: 0;
    margin-bottom: 24px;
    text-align: center;
  }
`;
