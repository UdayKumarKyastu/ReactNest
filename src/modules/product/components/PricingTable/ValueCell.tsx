import React from 'react'
import { PricingTableStyles } from './PricingTable.styles'
import { ChangeAlert as Alert } from '../../../common/components/ChangeAlert/ChangeAlert'

const { StyledValueCell } = PricingTableStyles

interface Props {
  children: JSX.Element | string
  hasChanges?: boolean
  dataSelector?: string
}

const ValueCell = ({ children, hasChanges, dataSelector }: Props) => {
  return (
    <StyledValueCell data-cy={dataSelector}>
      {children}
      {hasChanges && <Alert size="16px" />}
    </StyledValueCell>
  )
}

export default ValueCell
