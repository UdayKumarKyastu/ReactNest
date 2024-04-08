import React from 'react'
import { SectionStyles } from './Section.styles'
import { ArrowRight } from '../../../../icons/ArrowRight'

interface Props {
  children: JSX.Element | JSX.Element[]
  showArrow?: boolean
  isHidden?: boolean
  marginTop?: boolean
}

const { SectionRoot } = SectionStyles

const Section = (props: Props) => {
  const { children, showArrow, ...restProps } = props
  return (
    <SectionRoot {...restProps}>
      {children}
      {!!showArrow && <ArrowRight data-testid="arrow-right" />}
    </SectionRoot>
  )
}

export default Section
