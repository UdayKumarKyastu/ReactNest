import React from 'react'
import tw from 'twin.macro'
import styled from '@emotion/styled'

const Svg = () => (
  <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.5506 4L24.9624 17.1497H37L27.375 24.0418L31.1204 36L20.5506 29.0222L10.0736 35.9229L13.819 24.0418L4 17.1497H16.1304L20.5506 4Z"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)

const Wrapper = styled('div')`
  ${tw`flex justify-center items-center relative z-10 w-full h-full shadow-xl`}
  background: #1C4E7D;
`

export const Star = () => {
  return (
    <Wrapper>
      <Svg />
    </Wrapper>
  )
}
