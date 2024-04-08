import styled from '@emotion/styled'
import tw from 'twin.macro'

const Wrapper = styled('div')`
  width: 327.78px;
  height: 286px;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.2);
  ${tw`flex justify-center items-center bg-white flex-col m-5`}
`

const Footer = styled('div')`
  border-top: solid 1px;
  width: 279px;
  padding-top: 18px;
  margin-top: 10px;
  ${tw`flex justify-center items-center place-content-evenly bg-white flex-row border-gray-300`}
`

const FooterLeft = styled('div')`
  max-width: 147px;
  ${tw`text-sm`}
`

const FooterRight = styled('div')`
  ${tw`text-pretRed-800 text-4xl`}
`

export const Heading = styled('div')`
  font-size: 24px;
  font-weight: bold;
  line-height: 40px;
`

export const CardStyles = {
  Wrapper,
  Footer,
  FooterLeft,
  FooterRight,
  Heading,
}
