import React from 'react'
import { ChannelPrice } from '../../model/price'
import { PricingTableStyles } from './PricingTable.styles'
import { Locale } from '../../../i18n/Locale'
import ValueCell from './ValueCell'
import { withPercentage } from '../../../../util/withPercentage'
import { FieldArray } from 'formik'
import { cloneDeep } from 'lodash'
import { getCurrencySymbol } from '../../../../util/getCurrencySymbol'

const { EditTableRow, LabelCell, StyledInput, FlexBoxWrapper } = PricingTableStyles

interface Props {
  formFields: ChannelPrice[]
  takeAwayTaxDisabled?: boolean
  takeAwayTax?: number
}

enum PriceKey {
  EatIn = 'eatInPrice',
  TakeAway = 'takeAwayPrice',
  Delivery = 'deliveryPrice',
  takeAwayClubPret = 'takeAwayClubPret',
  eatInClubPret = 'eatInClubPret',
}

enum TaxKey {
  EatIn = 'eatInTax',
  TakeAway = 'takeAwayTax',
  Delivery = 'deliveryTax',
}

const EditFormBody = ({ formFields, takeAwayTax, takeAwayTaxDisabled }: Props) => {
  const { locale } = Locale.useLocale()

  const handlePriceChange = (value: string, previousPrice: ChannelPrice, key: PriceKey) => {
    const valueRegex = /^\d*[.]??\d*$/

    if (!valueRegex.test(value)) {
      return previousPrice
    }

    const newPrice = cloneDeep(previousPrice)
    newPrice[key].centAmount = value

    return newPrice
  }

  const handleTaxChange = (value: string, previousPrice: ChannelPrice, key: TaxKey) => {
    const valueRegex = /^\d*[.]??\d*$/

    if (!valueRegex.test(value) || Number(value) > 100) {
      return previousPrice
    }

    const newPrice = cloneDeep(previousPrice)
    newPrice[key] = value

    return newPrice
  }

  return (
    <tbody>
      {formFields.map((field, index) => {
        const currency = getCurrencySymbol(locale, field.eatInPrice.currencyCode)

        return (
          <FieldArray
            name="prices"
            key={`edit-pricing-row-${index}`}
            validateOnChange={false}
            render={(arrayHelpers) => (
              <EditTableRow>
                <LabelCell>{field?.channelLabel?.[locale]}</LabelCell>
                <ValueCell>
                  <FlexBoxWrapper>
                    {currency}
                    <StyledInput
                      label=""
                      className="money"
                      name={`prices[${index}].takeAwayPrice`}
                      id={`prices[${index}].takeAwayPrice`}
                      value={field.takeAwayPrice.centAmount.toString()}
                      onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const newPrice = handlePriceChange(
                          e.currentTarget.value,
                          field,
                          PriceKey.TakeAway,
                        )
                        arrayHelpers.replace(index, newPrice)
                      }}
                    />
                  </FlexBoxWrapper>
                </ValueCell>
                <ValueCell>
                  <FlexBoxWrapper>
                    {/* {currency} */}
                    <StyledInput
                      label=""
                      className="money"
                      name={`prices[${index}].takeAwayClubPret`}
                      id={`prices[${index}].takeAwayClubPret`}
                      value={field.takeAwayClubPret.centAmount.toString()}
                      onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const newPrice = handlePriceChange(
                          e.currentTarget.value,
                          field,
                          PriceKey.takeAwayClubPret,
                        )
                        arrayHelpers.replace(index, newPrice)
                      }}
                    />
                  </FlexBoxWrapper>
                </ValueCell>

                <ValueCell dataSelector={`prices[${index}].takeAwayTax`}>
                  {takeAwayTaxDisabled ? (
                    withPercentage({ locale, value: takeAwayTax || field.takeAwayTax })
                  ) : (
                    <FlexBoxWrapper>
                      <StyledInput
                        className="percentage"
                        label=""
                        name={`prices[${index}].takeAwayTaxRate`}
                        id={`prices[${index}].takeAwayTaxRate`}
                        value={formFields[index]?.takeAwayTax?.toString()}
                        onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          const newPrice = handleTaxChange(
                            e.currentTarget.value,
                            field,
                            TaxKey.TakeAway,
                          )
                          arrayHelpers.replace(index, newPrice)
                        }}
                      />
                      %
                    </FlexBoxWrapper>
                  )}
                </ValueCell>

                <ValueCell>
                  <StyledInput
                    label=""
                    className="money"
                    name={`prices[${index}].eatInPrice`}
                    id={`prices[${index}].eatInPrice`}
                    value={formFields[index]?.eatInPrice.centAmount.toString()}
                    onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      const newPrice = handlePriceChange(
                        e.currentTarget.value,
                        field,
                        PriceKey.EatIn,
                      )
                      arrayHelpers.replace(index, newPrice)
                    }}
                  />
                </ValueCell>
                <ValueCell>
                  <StyledInput
                    label=""
                    className="money"
                    name={`prices[${index}].eatInClubPret`}
                    id={`prices[${index}].eatInClubPret`}
                    value={formFields[index]?.eatInClubPret.centAmount.toString()}
                    onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      const newPrice = handlePriceChange(
                        e.currentTarget.value,
                        field,
                        PriceKey.eatInClubPret,
                      )
                      arrayHelpers.replace(index, newPrice)
                    }}
                  />
                </ValueCell>

                <ValueCell>
                  <FlexBoxWrapper>
                    <StyledInput
                      className="percentage"
                      label=""
                      name={`prices[${index}].eatInTaxRate`}
                      id={`prices[${index}].eatInTaxRate`}
                      value={formFields[index]?.eatInTax.toString()}
                      onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const newPrice = handleTaxChange(e.currentTarget.value, field, TaxKey.EatIn)
                        arrayHelpers.replace(index, newPrice)
                      }}
                    />
                    %
                  </FlexBoxWrapper>
                </ValueCell>

                <ValueCell>
                  <StyledInput
                    label=""
                    className="money"
                    name={`prices[${index}].deliveryPrice`}
                    id={`prices[${index}].deliveryPrice`}
                    value={formFields[index]?.deliveryPrice.centAmount.toString()}
                    onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      const newPrice = handlePriceChange(
                        e.currentTarget.value,
                        field,
                        PriceKey.Delivery,
                      )
                      arrayHelpers.replace(index, newPrice)
                    }}
                  />
                </ValueCell>

                <ValueCell>
                  <FlexBoxWrapper>
                    <StyledInput
                      className="percentage"
                      label=""
                      name={`prices[${index}].deliveryTaxRate`}
                      id={`prices[${index}].deliveryTaxRate`}
                      value={formFields[index]?.deliveryTax?.toString()}
                      onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const newPrice = handleTaxChange(
                          e.currentTarget.value,
                          field,
                          TaxKey.Delivery,
                        )
                        arrayHelpers.replace(index, newPrice)
                      }}
                    />
                    %
                  </FlexBoxWrapper>
                </ValueCell>
              </EditTableRow>
            )}
          />
        )
      })}
    </tbody>
  )
}

export default EditFormBody
