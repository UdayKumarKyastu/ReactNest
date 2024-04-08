import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Checkbox, Input, Table, Dropdown, Button } from '@pretamanger/component-library'
import { Link } from 'react-router-dom'
import { EditButtonWithPermissionCheck } from '../components/EditButtonWithPermissionCheck/EditButtonWithPermissionCheck'
import { FlagWithText } from '../../common/components/FlagWithText/FlagWithText'

const EditButton = styled(EditButtonWithPermissionCheck)`
  ${tw`absolute z-50`};
  top: 25px;
  right: 30px;
`

const Wrapper = styled('div')<{ isEditButtonHidden?: boolean }>`
  ${tw`grid gap-y-4 gap-x-14 p-8`}
  grid-template-columns: 225px 1fr;

  ${EditButton} {
    ${({ isEditButtonHidden }) => isEditButtonHidden && tw`hidden`}
  }
`

const TabWrapper = styled('div')<{ inModal?: boolean }>`
  ${tw`bg-white px-7 py-8 grid grid-cols-2 relative`}
  border: 5px solid #F6F4F5;
  grid-template-rows: max-content;
  min-height: 509px;

  ${({ inModal }) => inModal && tw`mt-6 min-h-0`}
`

const SectionHeading = styled('h2')`
  ${tw`font-bold text-2xl leading-lg tracking-base text-grey-600 mb-10 relative`}
  grid-column: 1 / -1;

  &:after {
    content: '';
    ${tw`bg-pretRed-700`}
    width: 60px;
    height: 4px;
    position: absolute;
    bottom: -14px;
    left: 0;
  }
`

const SubsectionHeading = styled('h3')`
  ${tw`font-medium text-lg leading-lg tracking-base text-grey-700 mb-3 flex items-center`}
`

const RegularHeading = styled('h4')`
  ${tw`font-bold text-lg leading-lg tracking-base text-grey-700 font-medium mb-5`}
`

const ParagraphBold = styled(`p`)`
  ${tw`font-bold text-base leading-lg tracking-base text-grey-600 mb-5`}
  margin-top: 24px;
`

const SectionDivider = styled('div')`
  ${tw`bg-grey-200 h-px w-full mt-6 mb-6`}
  height: 1px;
  grid-column: 1 / -1;
`

const StyledInput = styled(Input)<{ isHidden?: boolean }>`
  ${tw`font-normal text-base text-grey-700`}
  margin-bottom: 24px;

  ${({ isHidden }) => isHidden && tw`invisible`}

  input[disabled] {
    ${tw`bg-disabledGreyBackground`}
  }
`

const StyledCheckbox = styled(Checkbox)<{ isHidden?: boolean }>`
  ${tw`flex mb-3 text-gray-500`}

  ${({ isHidden }) => isHidden && tw`invisible`}

  span {
    ${tw`font-normal text-grey-500 text-base`}
  }

  div {
    ${tw`mr-4`}
  }
`

const RadioButtonWrapper = styled('div')<{ isHidden?: boolean }>`
  ${tw`mb-2 mt-2`}

  ${({ isHidden }) => isHidden && tw`invisible`}

  input:disabled ~ span:first-of-type {
    border: 1px solid #81797a !important;

    &:after {
      background-color: #81797a !important;
      top: 5px !important;
      left: 5px !important;
    }
  }
`

const Section = styled('div')<{ isHidden?: boolean; marginTop?: boolean }>`
  ${({ isHidden }) => isHidden && tw`hidden`}
  ${({ marginTop }) => marginTop && tw`mt-8`}
  grid-column: 1;
`

const FullWidthSection = styled('div')<{ isHidden?: boolean }>`
  ${({ isHidden }) => isHidden && tw`hidden`}
  grid-column: 1 / -1;
`

const BackLink = styled(Link)`
  ${tw`flex items-center text-base tracking-base no-underline text-pretRed-700`}
  svg {
    ${tw`mr-2`}
    height: 7.5px;
    width: 13px;
  }
`

const ProductName = styled('h1')`
  ${tw`text-3xl leading-xl mb-2 font-bold tracking-lg text-grey-600 mt-5`}
`

const Paragraph = styled('p')`
  ${tw`text-sm text-grey-700 mb-2`}

  a {
    ${tw`text-sm`}
  }
`

const Badge = styled('span')<{ background: string; color: string }>`
  ${tw`rounded-default h-6 px-3 py-1.5 text-sm font-medium mr-3.5`}
  background: ${(props) => props.background || '#9f1b32'};
  color: ${(props) => props.color || 'white'};
`

const ProductValue = styled('span')`
  ${'text-base tracking-base text-grey-700 block'}
`

const NavItem = styled('li')<{ active: boolean }>`
  ${tw`text-lg leading-xl flex items-center tracking-lg py-2 border-b border-grey-300 cursor-pointer`}
  ${(props) => (props.active ? tw`text-pretRed-700` : tw`text-grey-700`)}
  &:last-of-type {
    ${tw`border-b-0`}
  }
`

const PendingBadge = styled('span')`
  ${tw`bg-white border border-grey-300 rounded-default text-grey-400 font-normal text-sm leading-sm ml-auto px-2 py-1`}
`

const MenuWrapper = styled('div')`
  ${tw`mt-3`}
`
const ProductFields = styled('div')`
  background: #ffffff;
  box-shadow: -2px 6px 12px rgba(0, 0, 0, 0.25);
  padding: 30px 34px;
`

const FieldWrapper = styled('div')`
  input {
    pointer-events: none;
  }
`

const FooterNavigation = styled('div')`
  ${tw`flex justify-between mt-12`}

  a {
    ${tw`flex justify-between items-center no-underline`}
  }

  svg {
    margin-top: 2px;
  }

  span {
    ${tw`text-pretRed-700`}
    margin: 0 10px;
  }
`

const Separator = styled('div')`
  ${tw`border-grey-100 border-b-2`};
  grid-column: 1 / -1;
`

const CloseButton = styled('button')`
  ${tw`absolute z-40`};
  top: 25px;
  right: 30px;
`

const FormButtonsWrapper = styled('div')`
  ${tw`flex flex-row justify-between mt-10`};
`

const StyledTable = styled(Table)`
  ${tw`w-full text-left`};

  tr {
    ${tw`border-grey-100 border-b-2`};
  }

  tbody > tr {
    :nth-of-type(even) {
      ${tw`bg-grey-50`};
    }
  }

  th {
    ${tw`font-medium`};
  }

  td,
  th {
    ${tw`text-sm`};
    padding: 8px;
  }
`

const StyledDropdown = styled(Dropdown)`
  select {
    ${tw`bg-none border-0 p-0 text-sm text-grey-500 pointer-events-none`}
  }
`

const LocaleFieldValue = styled(FlagWithText)`
  ${tw`text-base leading-base mt-2`};
`

const FieldLabel = styled('span')`
  ${tw`block text-base text-grey-700 font-normal mb-1`};
`

const FieldValue = styled('span')`
  ${tw`block p-0 text-sm text-grey-500 whitespace-pre whitespace-pre-line`};
  min-height: 24px;

  span {
    ${tw`text-sm text-grey-500`};
  }
`

const InputWrapper = styled('div')`
  ${tw`relative mb-8`};
`

const TopRow = styled('div')`
  ${tw`flex justify-between`};
`

const PriceFieldsWrapper = styled(`div`)`
  ${tw`mb-4`};

  > div:first-of-type {
    ${tw`mb-1`};

    span {
      ${tw`m-0`};
    }
  }

  > div:last-of-type {
    ${tw`m-0`};

    span {
      ${tw`m-0`};
    }
  }
`

const FieldGroupWrapper = styled('div')`
  ${tw`flex justify-between`};

  > div {
    ${tw`mb-0`};
    width: 45%;
  }
`

const ReadonlySectionWrapper = styled('div')`
  ${tw`w-1/2`};
`

const DiscardButton = styled(Button)<{ fromTop?: string }>`
  ${tw`absolute bg-transparent text-pretRed-800 p-0`}
  position: absolute;
  right: -30px;
  top: 50%;
  background-color: transparent;
  transform: translateY(calc(-50% + 12px));

  ${(props) => props.fromTop && `transform: translateY(calc(-50% + ${props.fromTop}));`}

  path {
    ${tw`text-pretRed-700`}
  }

  :hover,
  :active {
    ${tw`bg-transparent`}
  }
`

const FieldDescription = styled('span')`
  ${tw`block text-sm text-grey-500 font-normal mb-1`};
  margin-top: -0.25rem;
`

const StyledLink = styled(Link)`
  ${tw`block mt-3 text-grey-700`}
`

/**
 * @deprecated
 * TODO: This should be refactored
 */
export const ProductStyles = {
  Wrapper,
  TabWrapper,
  SectionHeading,
  SectionDivider,
  StyledCheckbox,
  StyledInput,
  Section,
  FullWidthSection,
  SubsectionHeading,
  ParagraphBold,
  BackLink,
  ProductName,
  Badge,
  ProductFields,
  ProductValue,
  FieldWrapper,
  MenuWrapper,
  PendingBadge,
  NavItem,
  Paragraph,
  FooterNavigation,
  Separator,
  StyledTable,
  RegularHeading,
  EditButton,
  CloseButton,
  FormButtonsWrapper,
  StyledDropdown,
  FieldLabel,
  FieldValue,
  InputWrapper,
  DiscardButton,
  TopRow,
  PriceFieldsWrapper,
  FieldGroupWrapper,
  ReadonlySectionWrapper,
  RadioButtonWrapper,
  FieldDescription,
  StyledLink,
  LocaleFieldValue,
}
