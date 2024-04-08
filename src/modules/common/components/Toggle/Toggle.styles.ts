import tw, { styled } from 'twin.macro'

const Label = styled('label')`
  ${tw`flex justify-between items-center`}
`

const Dot = styled('div')`
  ${tw`absolute w-7 h-7 bg-white rounded-full shadow inset-y-0 left-0 border border-grey-200 transition-all`}
  box-shadow: 0px 4.00307px 4.00307px rgba(0, 0, 0, 0.25);
`

const Line = styled('div')`
  ${tw`bg-white w-12 h-7 border-2 bg-grey-100 rounded-full transition-all`}
  border-color: #D9D9D9;
`

const Wrapper = styled('div')`
  ${tw`relative`}
`

const HiddenCheckbox = styled('input')`
  ${tw`hidden`}

  &:checked ~ ${Dot} {
    transform: translateX(84%);
  }

  &:checked ~ ${Line} {
    ${tw`bg-successGreen border-successGreen`}
  }
`
export const ToggleStyles = {
  Label,
  Dot,
  Line,
  Wrapper,
  HiddenCheckbox,
}
