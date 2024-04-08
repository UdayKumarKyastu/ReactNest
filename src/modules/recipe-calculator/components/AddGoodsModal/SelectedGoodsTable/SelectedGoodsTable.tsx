import React from 'react'
import { GoodBase } from '../../../model/Good'
import { SelectedGoodsTableStyles } from './SelectedGoodsTable.styles'
import { Translation } from '../../../../i18n/Translation'
import RejectIcon from '../../../../../icons/RejectIcon'
import AcceptIcon from '../../../../../icons/AcceptIcon'
import { formatDateToLocale } from '../../../../../util/formatDateToLocale'
import { Locale } from '../../../../i18n/Locale'

const { Table, TableRow, Title, SelectedBadge, ButtonsCell } = SelectedGoodsTableStyles

interface Props {
  selectedGoods: GoodBase[]
  unSelectGood: (id: string) => void
}

const SelectedGoodsTable = ({ selectedGoods, unSelectGood }: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  return (
    <>
      <Title>{translate('recipeCalculator.addGoodsModal.selectedGoods')}</Title>

      <Table>
        <tbody>
          {selectedGoods.map((good) => (
            <TableRow key={`good-${good.id}`} data-testid="selected-row">
              <td>{good.name}</td>
              <td>{good.id}</td>
              <td>{formatDateToLocale(good.modifiedAt, locale)}</td>
              <ButtonsCell>
                <SelectedBadge data-testid="selected-badge">
                  {translate('recipeCalculator.addGoodsModal.selected')}
                  <AcceptIcon />
                </SelectedBadge>

                <RejectIcon
                  data-testid="reject-icon"
                  stroke="#575354"
                  onClick={() => unSelectGood(good.id)}
                />
              </ButtonsCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default SelectedGoodsTable
