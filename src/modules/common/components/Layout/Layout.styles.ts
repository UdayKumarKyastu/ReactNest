import styled from '@emotion/styled'
import tw from 'twin.macro'

const headerHeight = 69

const Grid = styled('div')`
  ${tw`grid w-screen h-screen`}
  grid-template-columns: 1fr;
  grid-template-rows: ${headerHeight}px 1fr;
  min-width: 1024px;
`

const Main = styled('div')`
  ${tw`overflow-y-scroll relative`}
`

export const LayoutStyles = {
  Grid,
  Main,
}
