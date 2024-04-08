import { FC } from 'react'
import { ProductStyles } from '../styles'
import { Product } from '../../model/product'
import { ProductVariant } from '../../model/product-variant'
import { Translation } from '../../../i18n/Translation'
import { ProductVariantDraftChangesStyles } from './ProductVariantDraftChangesPage.styles'
import { Routes } from '../../../routing/Routes'
import { AttributesDraftView } from '../../draft-views/AttributesDraftView'
import { VariantMarketingDraftView } from '../../draft-views/VariantMarketingDraftView'
import { ReportingDraftView } from '../../draft-views/ReportingDraftView'
import { PricingDraftView } from '../../draft-views/PricingDraftView'
import { LabellingDraftView } from '../../draft-views/LabellingDraftView'
import { DraftChangesExistNotice } from '../../components/DraftChangesExistNotice/DraftChangesExistNotice'
import { NoDraftChangesNotice } from '../../components/NoDraftChangesNotice/NoDraftChangesNotice'

export declare namespace ProductVariantDraftChangesPage {
  export type Props = {
    product: Product
    productVariant: ProductVariant
    draftVariant: ProductVariant
  }
}

const { TabWrapper, SectionHeading, FullWidthSection } = ProductStyles

const { Wrapper } = ProductVariantDraftChangesStyles

export const ProductVariantDraftChangesPage: FC<ProductVariantDraftChangesPage.Props> = ({
  product,
  productVariant,
  draftVariant,
}) => {
  const { translate } = Translation.useTranslation()
  const numberOfChanges = draftVariant?.changesCount?.total || 0

  const DraftChangesNotice = () => {
    if (numberOfChanges > 0) {
      return <DraftChangesExistNotice numberOfChanges={numberOfChanges} sku={product.sku} />
    }

    return <NoDraftChangesNotice />
  }

  return (
    <TabWrapper>
      <FullWidthSection>
        <SectionHeading data-cy="section-heading">
          {translate('productVariantDraftChangesPage.headline')}
        </SectionHeading>
        <DraftChangesNotice />
        {numberOfChanges > 0 && (
          <Wrapper>
            <VariantMarketingDraftView
              productVariant={productVariant}
              draftVariant={draftVariant}
              countryCode={product.countryCode}
              tabRoute={Routes.resolveProductVariantRoute(
                Routes.ProductVariant.marketing,
                productVariant.masterSku,
                productVariant.sku,
                true,
              )}
            />
            <ReportingDraftView
              productVariant={productVariant}
              draftVariant={draftVariant}
              productType={product.type}
              tabRoute={Routes.resolveProductVariantRoute(
                Routes.ProductVariant.reporting,
                productVariant.masterSku,
                productVariant.sku,
                true,
              )}
            />
            {productVariant.attributes && (
              <AttributesDraftView
                productVariant={productVariant}
                draftVariant={draftVariant!}
                tabRoute={Routes.resolveProductVariantRoute(
                  Routes.ProductVariant.attributes,
                  productVariant.masterSku,
                  productVariant.sku,
                  true,
                )}
              />
            )}
            <PricingDraftView
              productVariant={productVariant}
              draftVariant={draftVariant!}
              tabRoute={Routes.resolveProductVariantRoute(
                Routes.ProductVariant.pricing,
                productVariant.masterSku,
                productVariant.sku,
                true,
              )}
            />
            {productVariant.labelling && (
              <LabellingDraftView
                productVariant={productVariant}
                draftVariant={draftVariant!}
                tabRoute={Routes.resolveProductVariantRoute(
                  Routes.ProductVariant.labelling,
                  productVariant.masterSku,
                  productVariant.sku,
                  true,
                )}
              />
            )}
          </Wrapper>
        )}
      </FullWidthSection>
    </TabWrapper>
  )
}
