import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import * as React from "react";
import styled from "../../styles";

interface IStyledInputProps extends InputProps {
  className?: string;
}

interface IPhoneViewProps {
  value?: string | null;
  onChange: (value: string) => void;
}

const AreaCodeInput = styled<React.FunctionComponent<IStyledInputProps>>(
  props => <Input {...props} />
)`
  max-width: 128px;
  margin-right: 8px;
  width: 30%;
`;

const MainNumberInput = styled<React.FunctionComponent<IStyledInputProps>>(
  props => <Input {...props} />
)`
  max-width: 312px;
  width: calc(70% - 8px);
`;

class PhoneInput extends React.PureComponent<IPhoneViewProps, any> {
  public static defaultProps = {
    onChange: (value: string) => console.log(value)
  };

  public render() {
    const { value, onChange } = this.props;
    let values = ["", ""];
    if (value) {
      values = value.split("-");
    }
    return (
      <>
        <AreaCodeInput
          value={values[0]}
          onChange={e => {
            onChange(`${e.target.value}-${values[1]}`);
          }}
        />
        <MainNumberInput
          onChange={e => {
            onChange(`${values[0]}-${e.target.value}`);
          }}
          value={values[1]}
        />
      </>
    );
  }
}

export default PhoneInput;
