import styles from "../../styles";

export const InputRow = styles.div`
  margin: 0 2px 24px;
  position: relative;
  height: auto;
  zoom: 1;
  display: block;
  box-sizing: border-box;
`;

export const InputWrapper = styles.div`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const Input = styles.input`
  box-sizing: border-box;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 0;
  width: 100%;
  height: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
`;

export const LargeInput = styles(Input)`
  padding: 6px 11px;
  height: 40px;
  font-size: 16px;
`;

export const InputError = styles.span`
  color: #ffffff;
  background-color: #d32f2f;
  position: absolute;
  bottom: 100%;
  padding: 8px;
  bottom: -100%;
  left: 0;
  z-index: 10;
  border-radius: 2px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

  &:after {
    bottom: 100%;
    left: 10%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(213, 15, 28, 0);
    border-bottom-color: #d32f2f;
    border-width: 8px;
    margin-left: -8px;
  }
`;
