import styled from '@emotion/styled'
import tw from 'twin.macro'
import MaskedInput from '../../../common/components/MaskedInput/MaskedInput'
import { Button } from '@pretamanger/component-library'

const Title = styled.h2`
  ${tw`mt-10 mb-8 text-lg text-gray-700`}
`

const VatInput = styled(MaskedInput)`
  ${tw`mb-8`}
  width: 175px;
`

const VatLabel = styled.p`
  ${tw`mb-6`}
`

const Table = styled.table`
  ${tw`w-full font-normal`}

  td {
    ${tw`align-middle px-3 border-r border-gray-200 px-3`}
  }
`

const TableHeader = styled.thead`
  tr {
    height: 40px;
  }
`

const TableBody = styled.tbody`
  ${tw`text-sm`}

  tr {
    height: 35px;
  }
`

const TableFooter = styled.tfoot`
  ${tw`bg-gray-50`}

  tr {
    height: 40px;
  }
`

const TableRow = styled.tr`
  ${tw`border-gray-200 border`}
`

const Footer = styled.div`
  ${tw`flex justify-between items-center mt-6`}
`

const ResetButton = styled(Button)`
  ${tw`rounded-default`}
`

const StyledInput = styled(MaskedInput)`
  ${tw`inline-flex ml-1 mb-0`}
  width: 85px;

  input {
    ${tw`bg-transparent`}
  }

  input:disabled {
    ${tw`border-0`}
  }

  & [class*='LabelWrapper'] {
    display: none;
  }
`

export const PriceCalculatorStyles = {
  Title,
  VatInput,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  Footer,
  ResetButton,
  StyledInput,
  VatLabel,
}
