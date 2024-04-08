import tw, { styled } from 'twin.macro'
import { Button } from '@pretamanger/component-library'

const Wrapper = styled.div`
  ${tw`p-8 border border-solid border-gray-200 w-full flex justify-between`}
`

const Tile = styled.div`
  ${tw`w-6/12 flex justify-center items-center flex-col`}

  &:first-of-type {
    ${tw`border-r border-solid border-gray-200`}
  }
`

const TileButton = styled(Button)`
  ${tw`mt-6 whitespace-nowrap`}
`

export const RecipeCalculatorLandingStyles = { Wrapper, Tile, TileButton }
