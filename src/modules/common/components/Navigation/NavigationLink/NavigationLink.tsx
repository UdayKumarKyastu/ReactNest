import { PropsWithChildren } from 'react'
import { NavigationStyles } from '../Navigation.styles'

export declare namespace Link {
  export type Props = {
    to: string
    testSelector?: string
  }
}

const { StyledLink } = NavigationStyles

export const NavigationLink = ({ to, testSelector, children }: PropsWithChildren<Link.Props>) => {
  return (
    <StyledLink to={to} data-testid={testSelector}>
      {children}
    </StyledLink>
  )
}
