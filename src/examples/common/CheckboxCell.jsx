import React, { Component } from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`

class CheckboxCell extends Component {
  render() {
    const { checked, onChange, disabled = false } = this.props

    const handleChange = (e) => {
      e.stopPropagation()
      if (!disabled && onChange) {
        onChange(e.target.checked)
      }
    }

    return (
      <CheckboxContainer>
        <input
          type="checkbox"
          checked={checked || false}
          onChange={handleChange}
          disabled={disabled}
        />
      </CheckboxContainer>
    )
  }
}

export default CheckboxCell