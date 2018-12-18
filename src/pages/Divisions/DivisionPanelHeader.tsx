import { Button, Dropdown, Menu } from "antd";
import get from "lodash/get";
import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.85);
`;

export interface IDivision {
  id: number;
  name: string;
  ancestry: string[];
  children: object;
}

export interface IDivisionPanelHeader {
  division: IDivision;
  handleDivisionModal: (
    e: React.FormEvent<HTMLInputElement>,
    type: string | undefined,
    current: object | undefined
  ) => void;
}

class DivisionPanelHeader extends Component<IDivisionPanelHeader> {
  public handleMenuClick = ({ key, item, domEvent }) => {
    domEvent.stopPropagation();
    const { division, handleDivisionModal } = this.props;
    switch (key) {
      case "0":
        handleDivisionModal(domEvent, "create", division);
        break;
      case "1":
        handleDivisionModal(domEvent, "edit", division);
        break;
      case "2":
        console.log("Click!", key);
        break;
      default:
        console.log("Sorry, key " + key + " is not supported");
    }
  };

  public render() {
    const { division } = this.props;
    return (
      <Wrapper>
        <span>{get(division, "name")}</span>
        <Dropdown
          overlay={
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="0">Add Subdivision</Menu.Item>
              <Menu.Item key="1">Edit</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            size="small"
            icon="ellipsis"
            onClick={e => e.stopPropagation()}
          />
        </Dropdown>
      </Wrapper>
    );
  }
}

export default DivisionPanelHeader;
