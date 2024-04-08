import { Locale } from '../../../../i18n/Locale'
import { FlagWithText } from '../../../../common/components/FlagWithText/FlagWithText'
import { ProdutAllDraftChangesStyles } from '../ProductAllDraftChanges.styles'

interface Props {
  name: Locale.MultilangString
  hamiltonGrantProductCode?: string
  sku: string
  numberOfChanges: number
  productType: string
}

const { AccordionItemHeader, AccordionCell, HeaderCell, ProductDetails } =
  ProdutAllDraftChangesStyles

export const ItemHeader = ({
  name,
  hamiltonGrantProductCode,
  sku,
  numberOfChanges,
  productType,
}: Props) => {
  const { locale } = Locale.useLocale()

  return (
    <AccordionItemHeader data-cy="accordion-header">
      <AccordionCell>
        <HeaderCell data-cy="cell-name">{name[locale]}</HeaderCell>
        <ProductDetails>
          <FlagWithText locale={locale} />
          <span>{productType}</span>
        </ProductDetails>
      </AccordionCell>
      <AccordionCell>{hamiltonGrantProductCode}</AccordionCell>
      <AccordionCell>{sku}</AccordionCell>
      <AccordionCell data-cy="cell-changes" centered>
        {numberOfChanges}
      </AccordionCell>
    </AccordionItemHeader>
  )
}
