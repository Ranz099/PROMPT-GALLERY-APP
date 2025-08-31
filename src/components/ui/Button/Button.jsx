import React from 'react'
import StyledButton from './StyledButton'

export function Button({ children, onClick, kind='primary', size='md', title, type='button' }){
  return (
    <StyledButton
      $kind={kind}
      $size={size}
      onClick={onClick}
      title={title}
      type={type}
      data-kind={kind}
      data-size={size}
    >
      {children}
    </StyledButton>
  )
}
