import { FC, useCallback, useMemo } from 'react'
import { ProductVariant } from '../../model/product-variant'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { VariantsTable } from '../../components/VariantsTable/VariantsTable'
import { Routes } from '../../../routing/Routes'
import { Locale } from '../../../i18n/Locale'

export declare namespace ProductVariantsPage {
  export type Props = {
    masterSku: string
    variants: ProductVariant[]
  }
}

const { TabWrapper, SectionHeading, FullWidthSection } = ProductStyles

export const ProductVariantsPage: FC<ProductVariantsPage.Props> = ({ masterSku, variants }) => {
  const { translate } = Translation.useTranslation()
  const { navigateToProductVariant } = Routes.useNavigation()
  const { locale } = Locale.useLocale()

  const data = useMemo((): VariantsTable.Variant[] => {
    return variants.map((variant) => {
      return {
        name: variant.name[locale],
        sku: variant.sku,
        isMaster: variant.isMaster,
        status: variant.status,
      }
    })
  }, [locale, variants])

  const onRowClick = useCallback(
    (sku: string) => {
      navigateToProductVariant(masterSku, sku)
    },
    [masterSku, navigateToProductVariant],
  )

  return (
    <TabWrapper>
      <FullWidthSection>
        <SectionHeading data-cy="section-heading">
          {translate('productPage.productVariants')}
        </SectionHeading>
        <VariantsTable data={data} onRowClick={onRowClick} />
      </FullWidthSection>
    </TabWrapper>
  )
}
