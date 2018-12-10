import styled from "../../styles/index";
import Logo from "../../assets/logo.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: ${({ theme }) => theme.layoutBodyBackground};
`;

export const Content = styled.div`
  padding: 32px 0;
  flex: 1;
`;

export const Top = styled.div`
  text-align: center;
`;

export const Header = styled.div`
  a {
    text-decoration: none;
    display: flex;
    flex-flow: column;
  }
`;

export const StyledLogo = styled(Logo)`
  height: 120px;
  vertical-align: top;
  margin-bottom: 16px;
`;

export const Title = styled.span`
  font-size: 33px;
  color: ${({ theme }) => theme.headingColor};
  font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
`;

export const Language = styled.div`
  text-align: right;
  width: 100%;
  height: 40px;
  line-height: 44px;
`;
