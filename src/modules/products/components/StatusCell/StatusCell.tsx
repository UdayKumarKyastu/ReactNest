import { Cross, Confirmation } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { ProductsTableStyles } from '../../../home/components/ProductsTable/ProductsTable.styles'

export namespace StatusCell {
  export interface Props {
    published: boolean
  }
}

const { CellWithIcon, CrossIconWrapper } = ProductsTableStyles

export const StatusCell = ({ published }: StatusCell.Props) => {
  const { translate } = Translation.useTranslation()

  if (published) {
    return (
      <CellWithIcon>
        <Confirmation width="14px" height="14px" />
        {translate('product.published')}
      </CellWithIcon>
    )
  }

  return (
    <CellWithIcon>
      <CrossIconWrapper>
        <Cross colour="white" width="6px" height="6px" />
      </CrossIconWrapper>
      {translate('product.unpublished')}
    </CellWithIcon>
  )
}
