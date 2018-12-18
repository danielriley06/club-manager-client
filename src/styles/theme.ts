export interface InputSizeInterface {
  [size: string]: InputInterface;
}

export interface InputInterface {
  padding: string;
  height: string;
  fontSize: string;
}

export interface ThemeInterface {
  primaryColor: string;
  layoutBodyBackground: string;
  headingColor: string;
  inputLarge: InputInterface;
}

export const theme = {
  primaryColor: "rgba(0, 0, 0, 0.65)",
  layoutBodyBackground: "#f0f2f5",
  headingColor: "rgba(0, 0, 0, 0.85)",
  inputLarge: {
    padding: "6px 11px",
    height: "40px",
    fontSize: "16px"
  }
};
