import React, { PropsWithChildren } from 'react'
import { LayoutStyles } from './Layout.styles'
import { Navigation } from '../Navigation/Navigation'

export declare namespace Layout {
  export type Props = PropsWithChildren<{
    hideNavItems?: boolean
  }>
}

const { Grid, Main } = LayoutStyles

export const Layout = ({ children, hideNavItems }: Layout.Props) => {
  return (
    <Grid>
      <Navigation hideNavItems={hideNavItems} />
      <Main>{children}</Main>
    </Grid>
  )
}
