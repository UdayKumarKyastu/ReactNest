import React, { ComponentType } from 'react'
import { CardStyles } from './Card.styles'

export declare namespace Card {
  export type Props = {
    icon: ComponentType<any>
    heading: string
    description: string
    count: string | number
  }
}

const { Footer, FooterLeft, FooterRight, Heading, Wrapper } = CardStyles

export const Card = ({ icon: Icon, heading, description, count }: Card.Props) => {
  return (
    <Wrapper>
      <Icon />
      <Heading>{heading}</Heading>
      <Footer>
        <FooterLeft>{description}</FooterLeft>
        <FooterRight>{count}</FooterRight>
      </Footer>
    </Wrapper>
  )
}
