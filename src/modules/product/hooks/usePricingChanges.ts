import { ChannelPrice, ChannelPriceWithChanges } from '../model/price'
import { useMemo } from 'react'
import { isEqual } from 'lodash'

const usePricingChanges = (formFields: ChannelPrice[], fieldsToCompare?: ChannelPrice[]) => {
  const fieldsWithChanges = useMemo((): ChannelPriceWithChanges[] => {
    return (fieldsToCompare || []).map((field, index) => ({
      ...field,
      eatInPriceHasChanged: !isEqual(
        field.eatInPrice.centAmount,
        formFields[index].eatInPrice.centAmount,
      ),
      eatInClubPretHasChanged: !isEqual(
        field.eatInClubPret.centAmount,
        formFields[index].eatInClubPret.centAmount,
      ),
      eatInTaxHasChanged: !isEqual(field.eatInTax, formFields[index].eatInTax),
      takeAwayPriceHasChanged: !isEqual(
        field.takeAwayPrice.centAmount,
        formFields[index].takeAwayPrice.centAmount,
      ),
      takeAwayClubPretHasChanged: !isEqual(
        field.takeAwayClubPret.centAmount,
        formFields[index].takeAwayClubPret.centAmount,
      ),
      takeAwayTaxHasChanged: !isEqual(field.takeAwayTax, formFields[index].takeAwayTax),
      deliveryPriceHasChanged: !isEqual(
        field.deliveryPrice.centAmount,
        formFields[index].deliveryPrice.centAmount,
      ),
      deliveryTaxHasChanged: !isEqual(field.deliveryTax, formFields[index].deliveryTax),
    }))
  }, [fieldsToCompare, formFields])

  return { fieldsWithChanges }
}

export default usePricingChanges
