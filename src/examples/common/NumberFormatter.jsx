import React, { Component } from 'react'
import styled from 'styled-components'

const CurrencySpan = styled.span`
  &.currency-negative {
    color: #dc3545;
    font-weight: 500;
  }
  
  &.currency-positive {
    color: #28a745;
    font-weight: 500;
  }
`

class NumberFormatter extends Component {
  formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value)
  }

  render() {
    const { value, showSign = false } = this.props
    
    if (value === null || value === undefined) {
      return <span>-</span>
    }

    const numericValue = parseFloat(value)
    const isNegative = numericValue < 0
    const isZero = numericValue === 0
    
    let className = ''
    if (showSign && !isZero) {
      className = isNegative ? 'currency-negative' : 'currency-positive'
    }

    return (
      <CurrencySpan className={className}>
        {this.formatCurrency(numericValue)}
      </CurrencySpan>
    )
  }
}

export default NumberFormatter