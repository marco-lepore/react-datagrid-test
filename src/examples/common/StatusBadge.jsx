import React, { Component } from "react";
import styled from "styled-components";
import { AlertCircle } from "lucide-react";

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  height: 24px;

  &.da-inviare {
    color: #333333;
  }

  &.consegnata {
    background-color: rgb(112, 192, 132);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
  }

  &.errore {
    color: #333333;
  }
`;

class StatusBadge extends Component {
  getStatusClass = (idStatoSdi) => {
    if (idStatoSdi === 1) return "consegnata";
    if (idStatoSdi === -2) return "errore";
    return "da-inviare";
  };

  getStatusText = (idStatoSdi) => {
    if (idStatoSdi === 1) return "Consegnata";
    if (idStatoSdi === -2) return "Errore";
    return "Da inviare";
  };

  render() {
    const { idStatoSdi } = this.props;
    const statusClass = this.getStatusClass(idStatoSdi);
    const statusText = this.getStatusText(idStatoSdi);
    const showIcon = statusClass === "da-inviare" || statusClass === "errore";

    return (
      <Badge className={statusClass}>
        {showIcon && <AlertCircle size={14} color="#dc3545" />}
        {statusText}
      </Badge>
    );
  }
}

export default StatusBadge;
