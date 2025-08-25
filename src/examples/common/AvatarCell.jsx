import React, { Component } from 'react'
import styled from 'styled-components'

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AvatarIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 500;
`

class AvatarCell extends Component {
  getInitials = (name) => {
    if (!name) return '?'
    const words = name.split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  render() {
    const { name } = this.props
    const initials = this.getInitials(name)

    return (
      <AvatarContainer>
        <AvatarIcon>
          {initials}
        </AvatarIcon>
        <span>{name}</span>
      </AvatarContainer>
    )
  }
}

export default AvatarCell