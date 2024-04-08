import { Chevron } from '@pretamanger/component-library'
import { ProductBackButtonStyles } from './ProductBackButton.styles'
import { HTMLAttributes } from 'react'

const { Wrapper } = ProductBackButtonStyles

export declare namespace ProductBackButton {
  export type Props = HTMLAttributes<HTMLButtonElement>
}

export const ProductBackButton = ({ children, ...props }: ProductBackButton.Props) => {
  return (
    <Wrapper type="button" {...props}>
      <Chevron type="left" />
      {children}
    </Wrapper>
  )
}
