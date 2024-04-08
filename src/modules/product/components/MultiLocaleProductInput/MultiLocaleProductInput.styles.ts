import tw, { styled, css } from 'twin.macro'
import { Input, TextArea, Button } from '@pretamanger/component-library'
import { LocaleInputAdornmentStyles } from '../../../common/components/LocaleInputAdornment/LocaleInputAdornment.styles'

// TODO: resolve typing issue
const Wrapper = styled('div')<{ isHidden?: boolean }>`
  ${({ isHidden }: any) => isHidden && tw`hidden`}
  ${tw`relative`};
`

const ShowLanguagesButton = styled('button')`
  ${tw`text-base tracking-base text-successGreen mt-2 text-pretRed-700 mb-6 underline`}
`

const Divider = styled('span')`
  ${tw`w-px absolute left-1/2 -translate-y-full border-r border-dashed`}
  height: 98%;
  top: 1%;
`

const StyledInput = styled(Input)`
  ${tw`font-normal text-base text-grey-700`}
  & > div:nth-of-type(2) {
    ${tw`flex flex-row-reverse h-11 items-center w-full border border-grey-500`}

    input:disabled {
      ${tw`pt-2 border-none bg-transparent text-grey-500`}
    }

    input {
      ${tw`border-none pl-24`}
    }

    input:focus {
      ${tw`z-10`}
    }
  }
`

const StyledTextArea = styled(TextArea)`
  textarea {
    ${tw`border-none pt-3 pl-24`}
  }

  textarea:disabled {
    min-height: 120px;
    ${tw`resize-none h-full border-none bg-transparent pt-3 text-grey-500 w-1/2`}
    margin-right: auto;
  }

  textarea:focus {
    ${tw`z-10`}
  }

  > div {
    ${tw`h-auto text-grey-700`}
  }

  & > div:nth-of-type(2) {
    ${tw`flex flex-row-reverse h-full items-start border border-grey-500`}
  }
`

// Remove double borders when input and textareas
// are in a list
const listInputStyles = css`
  ${tw`border-grey-200 border-b`}

  :last-of-type {
    ${tw`border-none`}
  }

  :not(:first-of-type) {
    input,
    textarea {
      border-top: 0;
    }

    ${LocaleInputAdornmentStyles.Wrapper} {
      border-top: 0;
    }
  }
`

const ReadonlyFieldWrapper = styled('div')`
  ${LocaleInputAdornmentStyles.Wrapper} {
    ${tw`relative ml-0 mr-1`}
  }

  > div {
    ${tw`flex ml-0 p-2.5 pl-1`}
  }
`

const LanguageInputList = styled('div')`
  ${tw`mb-8`}

  ${StyledInput} {
    ${listInputStyles}
  }

  ${StyledTextArea} {
    ${listInputStyles}
  }

  // Remove spacing between inputs
  & > div {
    margin-bottom: -2px;
  }

  ${ReadonlyFieldWrapper} {
    ${tw`relative`};
    > svg {
      ${tw`absolute top-1/2 right-0`};
      transform: translateY(-50%);
    }

    > span {
      ${tw`p-2 pl-0 border-t border-grey-200 grid`};
      grid-template-columns: auto 1fr;
    }

    &:last-of-type {
      > span {
        ${tw`border-b`};
      }
    }
  }
`

const DiscardButton = styled(Button)<{ withoutLabel?: boolean }>`
  ${tw`absolute bg-transparent text-pretRed-800 p-0`}
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(calc(-50% + 16px));
  background-color: transparent;

  ${({ withoutLabel }: any) =>
    withoutLabel &&
    css`
      transform: translateY(-50%);
    `}

  path {
    ${tw`text-pretRed-700`}
  }

  :hover {
    ${tw`bg-transparent`}
  }
`

const LocaleInputWrapper = styled('div')`
  position: relative;
`

const FieldLabel = styled('span')`
  ${tw`block text-grey-700 font-normal mb-3`};
`

export const MultiLocaleProductInputStyles = {
  Wrapper,
  ShowLanguagesButton,
  Divider,
  StyledInput,
  StyledTextArea,
  LanguageInputList,
  ReadonlyFieldWrapper,
  LocaleInputWrapper,
  DiscardButton,
  FieldLabel,
}
