import React, { Component } from "react";
import styled from "styled-components";

const StarIcon = styled.span`
  cursor: pointer;
  color: #ffc107;
  font-size: 16px;

  &.inactive {
    color: #dee2e6;
  }
`;

class StarToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  render() {
    const { active } = this.state;
    const { disabled = false } = this.props;

    const handleClick = () => {
      this.setState({ active: !active });
    };

    return (
      <StarIcon
        className={active ? "active" : "inactive"}
        onClick={handleClick}
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        ★
      </StarIcon>
    );
  }
}

export default StarToggle;
