import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  ${tw`flex-shrink-0 flex justify-center items-center absolute left-0 ml-3 z-10`}

  span {
    ${tw`ml-1.5 text-grey-500`}
  }
`

const Label = styled('span')`
  ${tw`block ml-1 -mt-0.5 text-grey-500`}
`

export const LocaleInputAdornmentStyles = {
  Label,
  Wrapper,
}
