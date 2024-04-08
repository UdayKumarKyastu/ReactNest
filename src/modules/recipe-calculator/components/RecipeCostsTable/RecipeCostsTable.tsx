import React, { useCallback, useMemo } from 'react'
import { RecipeCostsTableStyles } from './RecipeCostsTable.styles'
import { Translation } from '../../../i18n/Translation'
import { Good, RecipeGood } from '../../model/Good'
import MinusIcon from '../../../../icons/Minus'
import AddIcon from '../../../../icons/Add'
import { Locale } from '../../../i18n/Locale'
import { withCurrency } from '../../../../util/withCurrency'
import { DEFAULT_CURRENCY_CODE, INTEGER_REGEX } from '../../../common/constants'

const {
  Root,
  TableHeader,
  TableRow,
  Title,
  Table,
  TableFooter,
  Button,
  TableBody,
  StyledInput,
  CellWrapper,
  CostInput,
  UnitCurrencyWrapper,
  TotalCostCell,
} = RecipeCostsTableStyles

interface Props {
  recipeGoods: RecipeGood[]
  goodsOriginals: Good[]
  onAddGoods: () => void
  onRemoveGood: (goodId: string) => void
  onRestoreGood: (goodId: string) => void
  onEditQuantity: (goodId: string, quantity: number) => void
  onEditCost: (goodId: string, cost: number) => void
  onResetGoods: () => void
  onResetQuantity: (goodId: string, quantity: number) => void
  onResetCost: (goodId: string) => void
  editMode: boolean
  totalCost: number
}

const RecipeCostsTable = ({
  recipeGoods,
  goodsOriginals,
  onAddGoods,
  onRemoveGood,
  onRestoreGood,
  onEditCost,
  onEditQuantity,
  editMode,
  onResetGoods,
  onResetQuantity,
  onResetCost,
  totalCost,
}: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const currency = recipeGoods[0]?.cost.currencyCode || DEFAULT_CURRENCY_CODE

  const totalCostString = useMemo(() => {
    return withCurrency({
      locale,
      currency,
      value: totalCost,
      maximumSignificantDigits: 10,
    })
  }, [locale, currency, totalCost])

  const handleQuantityChange = useCallback(
    (goodId: string, value: string, goodName: string) => {
      onEditQuantity(goodId, Number(value))
    },
    [onEditQuantity],
  )

  const hasCostChanged = useCallback(
    (good: Good) => {
      const original = goodsOriginals.find(({ id }) => good.id === id)
      return original?.cost.centAmount !== good.cost.centAmount
    },
    [goodsOriginals],
  )

  const hasQuantityChanged = useCallback(
    (good: Good) => {
      const original = goodsOriginals.find(({ id }) => good.id === id)
      return original?.quantity !== good.quantity
    },
    [goodsOriginals],
  )

  const hasAnyValueChanged = useMemo(() => {
    return recipeGoods.some((good) => {
      return hasCostChanged(good) || hasQuantityChanged(good)
    })
  }, [hasCostChanged, hasQuantityChanged, recipeGoods])

  const calculateTotalCost = useCallback((good: Good) => {
    return (Number(good.cost.centAmount) * good.quantity) / 100
  }, [])

  return (
    <Root data-testid="recipe-cost-table">
      <Title>{translate('recipeCalculator.recipeCosts.title')}</Title>

      <Table>
        <TableHeader>
          <TableRow>
            <td>{translate('recipeCalculator.recipeCosts.ingredient')}</td>
            <td>{translate('recipeCalculator.recipeCosts.quantity')}</td>
            <td>{translate('recipeCalculator.recipeCosts.cost')}</td>
            <td>{translate('recipeCalculator.recipeCosts.itemTotalCost')}</td>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recipeGoods.map((good) => (
            <TableRow
              className={good.removed ? 'removed-row' : ''}
              key={`recipe-good-${good.name}-${good.id}`}
              data-testid="good-row"
            >
              <td>
                {good.removed
                  ? editMode && (
                      <AddIcon
                        onClick={() => onRestoreGood(good.id)}
                        data-testid="restore-toggle"
                      />
                    )
                  : editMode && (
                      <MinusIcon
                        onClick={() => onRemoveGood(good.id)}
                        data-testid="remove-toggle"
                      />
                    )}
                {good.name}
              </td>

              <td>
                <CellWrapper>
                  <span>
                    <StyledInput
                      disabled={good.removed || !editMode}
                      value={good.quantity.toString()}
                      mask={INTEGER_REGEX}
                      onChange={(value: string) => handleQuantityChange(good.id, value, good.name)}
                      testSelector="quantity-input"
                    />
                    <UnitCurrencyWrapper>{good.unitOfMeasurement}</UnitCurrencyWrapper>
                  </span>

                  <Button
                    compact
                    styleType="tertiary"
                    onClick={() => onResetQuantity(good.id, good.quantity)}
                    visible={hasQuantityChanged(good)}
                    data-testid="reset-quantity"
                  >
                    {translate('recipeCalculator.recipeCosts.reset')}
                  </Button>
                </CellWrapper>
              </td>
              <td>
                <CellWrapper>
                  <span>
                    <CostInput
                      onChange={(value: number) => onEditCost(good.id, value)}
                      disabled={good.removed || !editMode}
                      value={good.cost.centAmount}
                      testSelector="cost-input"
                    />
                    <UnitCurrencyWrapper>{good.cost.currencyCode}</UnitCurrencyWrapper>
                  </span>

                  <Button
                    compact
                    styleType="tertiary"
                    onClick={() => onResetCost(good.id)}
                    visible={hasCostChanged(good)}
                    data-testid="reset-cost"
                  >
                    {translate('recipeCalculator.recipeCosts.reset')}
                  </Button>
                </CellWrapper>
              </td>

              <td>
                {withCurrency({
                  locale,
                  currency,
                  value: calculateTotalCost(good),
                  maximumSignificantDigits: 10,
                })}
              </td>
            </TableRow>
          ))}

          {editMode && (
            <TableRow className="with-padding" data-testid="add-new-row">
              <td colSpan={4}>
                <AddIcon onClick={onAddGoods} data-testid="add-new-toggle" />
                {translate('recipeCalculator.recipeCosts.addGoods')}
              </td>
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <td />
            <td colSpan={3}>
              <TotalCostCell>
                <p>{translate('recipeCalculator.recipeCosts.totalCost')}</p>
                <p>{totalCostString}</p>
              </TotalCostCell>
            </td>
          </TableRow>
        </TableFooter>
      </Table>

      <Button
        visible
        onClick={onResetGoods}
        styleType="secondary"
        compact
        disabled={!hasAnyValueChanged}
        data-testid="reset-button"
      >
        {translate('recipeCalculator.recipeCosts.resetRecipeCosts')}
      </Button>
    </Root>
  )
}

export default RecipeCostsTable
