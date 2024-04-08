import React from 'react'
import { WrapperWithArrowStyles } from './WrapperWithArrow.styles'
import { ArrowRight } from '../../../../icons/ArrowRight'

interface Props {
  children: JSX.Element | JSX.Element[]
  showArrow?: boolean
}

const { WrapperWithArrowRoot } = WrapperWithArrowStyles

const WrapperWithArrow = ({ showArrow, children }: Props) => {
  return (
    <WrapperWithArrowRoot>
      {children}
      {!!showArrow && <ArrowRight />}
    </WrapperWithArrowRoot>
  )
}

export default WrapperWithArrow
