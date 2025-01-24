import React from 'react'

function CloseButton() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export function RedCloseButton() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="red" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default CloseButton

