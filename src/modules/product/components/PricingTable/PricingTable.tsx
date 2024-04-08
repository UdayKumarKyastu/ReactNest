import React from 'react'
import { PricingTableStyles } from './PricingTable.styles'
import { ChannelPriceWithChanges } from '../../model/price'
import TableHead from './TableHead'
import ReadOnlyBody from './ReadOnlyBody'
import EditFormBody from './EditFormBody'

const { StyledTable } = PricingTableStyles

interface Props {
  formFields: ChannelPriceWithChanges[]
  takeAwayTax?: number
  isFullView: boolean
  isEditMode?: boolean
  takeAwayTaxDisabled?: boolean
}

const PricingTable = ({
  formFields,
  takeAwayTax,
  isFullView,
  isEditMode,
  takeAwayTaxDisabled,
}: Props) => (
  <StyledTable isFullView={isFullView}>
    <TableHead showTooltip={takeAwayTaxDisabled} />

    {isEditMode ? (
      <EditFormBody
        formFields={formFields}
        takeAwayTax={takeAwayTax}
        takeAwayTaxDisabled={takeAwayTaxDisabled}
      />
    ) : (
      <ReadOnlyBody
        formFields={formFields}
        takeAwayTax={takeAwayTax}
        takeAwayTaxDisabled={takeAwayTaxDisabled}
      />
    )}
  </StyledTable>
)

export default PricingTable
