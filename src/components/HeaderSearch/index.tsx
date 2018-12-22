import { AutoComplete, Icon, Input } from "antd";
import classNames from "classnames";
import Bind from "lodash-decorators/bind";
import Debounce from "lodash-decorators/debounce";
import PropTypes from "prop-types";
import * as React from "react";
import styles from "./index.less";

interface IHeaderSearchProps {
  className: string;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onPressEnter: (value: string) => void;
  onVisibleChange: (value: boolean) => void;
  onChange?: (value: string) => void;
}

export default class HeaderSearch extends React.Component<
  IHeaderSearchProps,
  any
> {
  public static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onPressEnter: PropTypes.func,
    defaultActiveFirstOption: PropTypes.bool,
    dataSource: PropTypes.array,
    defaultOpen: PropTypes.bool,
    onVisibleChange: PropTypes.func
  };

  public static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    className: "",
    placeholder: "",
    dataSource: [],
    defaultOpen: false,
    onVisibleChange: () => {}
  };

  public static getDerivedStateFromProps(props) {
    if ("open" in props) {
      return {
        searchMode: props.open
      };
    }
    return null;
  }

  public clearTimeout;
  public timeout;
  private inputRef;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef<Input>();
    this.state = {
      searchMode: props.defaultOpen,
      value: ""
    };
  }

  saveInput = (node: Input | null) => {
    this.inputRef = node;
  };

  public componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  public onKeyDown = e => {
    if (e.key === "Enter") {
      const { onPressEnter } = this.props;
      const { value } = this.state;
      const searchValue = value || "";
      this.timeout = setTimeout(() => {
        onPressEnter(searchValue); // Fix duplicate onPressEnter
      }, 0);
    }
  };

  public onChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  };

  public enterSearchMode = () => {
    const { onVisibleChange } = this.props;
    onVisibleChange(true);
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode) {
        this.inputRef.input.focus();
      }
    });
  };

  public leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: ""
    });
  };

  // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false
  })
  public debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  }

  public render() {
    const { className, placeholder, open, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode
    });
    return (
      <span
        className={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}
        onTransitionEnd={({ propertyName }) => {
          if (propertyName === "width" && !searchMode) {
            const { onVisibleChange } = this.props;
            onVisibleChange(searchMode);
          }
        }}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            ref={input => this.saveInput(input)}
            aria-label={placeholder}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
