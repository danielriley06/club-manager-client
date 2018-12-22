import * as React from "react";

import Logo from "../../assets/logo.svg";
import styled from "../../styles";

export interface ISiderLogoProps {
  collapsed: boolean;
}

const SiderLogo: React.FunctionComponent<ISiderLogoProps> = ({ collapsed }) => {
  const StyledLogoWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
    transition: all 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const StyledLogo = styled(Logo)`
    height: 64px;
    flex-shrink: 0;
  `;

  const LogoFont = styled("span")`
    font-family: "Passion One", cursive;
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    display: ${(props: ISiderLogoProps) =>
      props.collapsed ? "none" : "inline"};
  `;

  return (
    <StyledLogoWrapper>
      <StyledLogo />
      <LogoFont collapsed={collapsed}>Soul City</LogoFont>
    </StyledLogoWrapper>
  );
};

export default SiderLogo;
