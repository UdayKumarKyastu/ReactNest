import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Translation } from '../../../i18n/Translation'
import { PriceCalculatorStyles } from './PriceCalculator.styles'
import { RecipeGood } from '../../model/Good'
import { DECIMAL_REGEX, DEFAULT_CURRENCY_CODE } from '../../../common/constants'
import { withCurrency } from '../../../../util/withCurrency'
import { Locale } from '../../../i18n/Locale'
import { parseInt } from 'lodash'
import { withPercentage } from '../../../../util/withPercentage'
import { Button } from '@pretamanger/component-library'
import ExportIcon from '../../../../icons/Export'
import useExportToCsv from '../../hooks/useExportToCsv'

const {
  Title,
  Table,
  TableFooter,
  TableHeader,
  TableRow,
  TableBody,
  VatInput,
  VatLabel,
  Footer,
  ResetButton,
  StyledInput,
} = PriceCalculatorStyles

interface Props {
  recipeName: string
  recipeGoods: RecipeGood[]
  totalCost: number
  editMode: boolean
}

const PriceCalculator = ({ recipeGoods, editMode, totalCost, recipeName }: Props) => {
  const [price1, setPrice1] = useState('')
  const [price2, setPrice2] = useState('')
  const [price3, setPrice3] = useState('')
  const [vat, setVat] = useState('')
  const { translate } = Translation.useTranslation()
  const currency = recipeGoods[0]?.cost.currencyCode || DEFAULT_CURRENCY_CODE
  const { locale } = Locale.useLocale()

  const isResetDisabled = useMemo(() => {
    return !(price1 || price2 || price3)
  }, [price1, price2, price3])

  const onReset = useCallback(() => {
    setPrice1('')
    setPrice2('')
    setPrice3('')
    setVat('')
  }, [setPrice1, setPrice2, setPrice3])

  useEffect(() => {
    onReset()
  }, [editMode, onReset])

  const addVat = useCallback(
    (price: string) => {
      if (!price) {
        return ''
      }
      const tax = vat ? parseInt(vat) / 100 : 0
      return parseFloat(price) + tax * parseFloat(price)
    },
    [vat],
  )

  const calculateContribution = useCallback(
    (price: string) => {
      const value = price ? parseFloat(price) - totalCost : 0
      return withCurrency({ currency, locale, value })
    },
    [currency, locale, totalCost],
  )

  const calculateTCOF = useCallback(
    (price: string) => {
      const value = price ? (totalCost / 100 / parseFloat(price)) * 100 : 0
      return withPercentage({ locale, value })
    },
    [locale, totalCost],
  )

  const { exportToCsv } = useExportToCsv(
    recipeName,
    recipeGoods,
    totalCost,
    vat,
    addVat,
    calculateTCOF,
    calculateContribution,
    price1,
    price2,
    price3,
    currency,
  )

  return (
    <div data-testid="price-calculator">
      <Title>{translate('recipeCalculator.priceCalculator.title')}</Title>
      {editMode && (
        <VatInput
          mask={DECIMAL_REGEX}
          label={translate('recipeCalculator.priceCalculator.vatRate')}
          onChange={setVat}
          testSelector="vat-input"
          value={vat}
        />
      )}
      {!editMode && <VatLabel>{translate('recipeCalculator.priceCalculator.noVAT')}</VatLabel>}

      <Table>
        <TableHeader>
          <TableRow>
            <td />
            <td>{translate('recipeCalculator.priceCalculator.sellingPrice1')}</td>
            <td>{translate('recipeCalculator.priceCalculator.sellingPrice2')}</td>
            <td>{translate('recipeCalculator.priceCalculator.sellingPrice3')}</td>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <td>{translate('recipeCalculator.priceCalculator.sellingPriceExVat')}</td>
            <td>
              {currency}
              <StyledInput
                mask={DECIMAL_REGEX}
                value={price1}
                onChange={setPrice1}
                disabled={!editMode}
                testSelector="selling-price1"
              />
            </td>
            <td>
              {currency}
              <StyledInput
                mask={DECIMAL_REGEX}
                value={price2}
                onChange={setPrice2}
                disabled={!editMode}
                testSelector="selling-price2"
              />
            </td>
            <td>
              {currency}
              <StyledInput
                mask={DECIMAL_REGEX}
                value={price3}
                onChange={setPrice3}
                disabled={!editMode}
                testSelector="selling-price3"
              />
            </td>
          </TableRow>

          <TableRow>
            <td>{translate('recipeCalculator.priceCalculator.sellingPriceIncVat')}</td>
            <td data-testid="with-vat-1">
              {withCurrency({
                locale,
                currency,
                value: addVat(price1),
              })}
            </td>
            <td>
              {withCurrency({
                locale,
                currency,
                value: addVat(price2),
              })}
            </td>
            <td>
              {withCurrency({
                locale,
                currency,
                value: addVat(price3),
              })}
            </td>
          </TableRow>

          <TableRow>
            <td>{translate('recipeCalculator.priceCalculator.contribution')}</td>
            <td data-testid="contribution-1">{calculateContribution(price1)}</td>
            <td>{calculateContribution(price2)}</td>
            <td>{calculateContribution(price3)}</td>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <td>{translate('recipeCalculator.priceCalculator.TCOF')}</td>
            <td data-testid="tcof-1">{calculateTCOF(price1)}</td>
            <td>{calculateTCOF(price2)}</td>
            <td>{calculateTCOF(price3)}</td>
          </TableRow>
        </TableFooter>
      </Table>

      <Footer>
        <ResetButton
          disabled={isResetDisabled}
          styleType="secondary"
          compact
          onClick={onReset}
          data-testid="reset-button"
        >
          {translate('recipeCalculator.priceCalculator.resetPriceCalculator')}
        </ResetButton>
        <Button
          styleType="tertiary"
          onClick={exportToCsv}
          icon={<ExportIcon />}
          data-testid="export-to-csv-button"
        >
          {translate('recipeCalculator.priceCalculator.exportAsCsv')}
        </Button>
      </Footer>
    </div>
  )
}

export default PriceCalculator
