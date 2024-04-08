import styled from '@emotion/styled'
import tw from 'twin.macro'
import { Input } from '@pretamanger/component-library'

const Wrapper = styled('div')`
  .DayPicker-Caption {
    text-align: center;
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 15px;
    width: 100%;
    justify-content: space-between;
    left: 0;
    padding: 0 30px;

    > div {
      width: 50%;
      margin: 0;

      :last-of-type {
        width: 40%;
      }
    }

    label {
      display: none;
    }
  }

  .DayPicker-wrapper {
    ${tw`border border-grey-500 p-4`}
  }

  .DayPickerInput-Overlay {
    ${tw`shadow-none`}
  }

  .DayPickerInput {
    ${tw`w-full`}
  }

  .DayPicker-Months {
    ${tw`pt-8`}
  }

  .DayPicker-Day {
    ${tw`font-normal text-grey-500 hover:bg-transparent! rounded-none p-0`}
    width: 32px;
    height: 32px;
  }

  .DayPicker-Day--selected {
    ${tw`bg-pretRed-800! text-white`}

    :hover {
      ${tw`bg-pretRed-800!`}
    }
  }
`

const DatePickerInput = styled(Input)`
  ${tw`font-normal text-base relative mb-0 w-full`}
  margin: 12px 0;

  div {
    ${tw`w-full`}
  }

  input {
    ${tw`text-grey-500`}
  }

  svg {
    ${tw`absolute top-1/2`}
    transform: translateY(-50%);
    right: 5px;
    pointer-events: none;
  }
`

const StyledNavbar = styled('div')`
  ${tw`absolute w-full flex justify-between`}
  top: 27px;
  left: 0;
  padding: 0 10px;

  svg {
    cursor: pointer;
    z-index: 10;
  }
`

export const DatepickerStyles = {
  DatePickerInput,
  Wrapper,
  StyledNavbar,
}
