import * as styledComponents from "styled-components";

import { theme, ThemeInterface } from "./theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider, theme };
export default styled;
