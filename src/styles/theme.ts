export interface IInputSizeInterface {
  [size: string]: IInputInterface;
}

export interface IInputInterface {
  padding: string;
  height: string;
  fontSize: string;
}

export interface IThemeInterface {
  primaryColor: string;
  fontSizeBase: string;
  layoutBodyBackground: string;
  headingColor: string;
  inputLarge: IInputInterface;
}

export const theme = {
  primaryColor: "rgba(0, 0, 0, 0.65)",
  fontSizeBase: "16px",
  layoutBodyBackground: "#f0f2f5",
  headingColor: "rgba(0, 0, 0, 0.85)",
  inputLarge: {
    padding: "6px 11px",
    height: "40px",
    fontSize: "16px"
  }
};
