import { ChannelPrice } from '../model/price'
import PricingTable from '../components/PricingTable/PricingTable'
import usePricingChanges from '../hooks/usePricingChanges'
import WrapperWithArrow from '../components/WrapperWithArrow/WrapperWithArrow'

export const usePricingSections = (
  formFields: ChannelPrice[],
  fieldsToCompare?: ChannelPrice[],
  isSideBySideView?: boolean,
  takeawayTax?: number,
  takeAwayTaxDisabled?: boolean,
) => {
  const { fieldsWithChanges } = usePricingChanges(formFields, fieldsToCompare)

  const section = fieldsToCompare ? (
    <WrapperWithArrow showArrow>
      <PricingTable
        formFields={fieldsWithChanges}
        takeAwayTax={takeawayTax}
        isFullView={!isSideBySideView}
        takeAwayTaxDisabled={takeAwayTaxDisabled}
      />
    </WrapperWithArrow>
  ) : (
    <PricingTable
      formFields={formFields}
      takeAwayTax={takeawayTax}
      isFullView={!isSideBySideView}
      takeAwayTaxDisabled={takeAwayTaxDisabled}
    />
  )

  return { section }
}
