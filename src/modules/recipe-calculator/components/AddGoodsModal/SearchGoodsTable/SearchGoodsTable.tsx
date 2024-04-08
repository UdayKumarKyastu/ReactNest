import React, { useMemo } from 'react'
import { GoodBase } from '../../../model/Good'
import { SearchGoodsTableStyles } from './SearchGoodsTable.styles'
import { Translation } from '../../../../i18n/Translation'
import { Locale } from '../../../../i18n/Locale'
import { formatDateToLocale } from '../../../../../util/formatDateToLocale'

const { Root, Table, TableHeader, TableRow, SelectButton } = SearchGoodsTableStyles

interface Props {
  goodsList: GoodBase[]
  selectedGoods: GoodBase[]
  onSelect: (good: GoodBase) => void
}

const SearchGoodsTable = ({ goodsList, onSelect, selectedGoods }: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const notSelectedGoods = useMemo(() => {
    return goodsList.filter(({ id }) => !selectedGoods.find((selected) => selected.id === id))
  }, [selectedGoods, goodsList])

  if (!notSelectedGoods.length) {
    return null
  }

  return (
    <Root>
      <Table data-testid="search-goods-table">
        <TableHeader>
          <TableRow>
            <td>{translate('recipeCalculator.addGoodsModal.goodsName')}</td>
            <td>{translate('recipeCalculator.addGoodsModal.goodId')}</td>
            <td>{translate('recipeCalculator.addGoodsModal.lastModified')}</td>
            <td />
          </TableRow>
        </TableHeader>

        <tbody>
          {notSelectedGoods.map((good) => (
            <TableRow
              key={`search-row-${good.id}`}
              id={`selected-good-${good.id}`}
              data-testid="search-good-row"
            >
              <td>{good.name}</td>
              <td>{good.hgGoodId || '-'}</td>
              <td>{formatDateToLocale(good.modifiedAt, locale)}</td>
              <td>
                <SelectButton
                  onClick={() => onSelect(good)}
                  styleType="secondary"
                  compact
                  data-testid="select-button"
                >
                  {translate('recipeCalculator.addGoodsModal.select')}
                </SelectButton>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Root>
  )
}

export default SearchGoodsTable
