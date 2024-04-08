import React, { useCallback } from 'react'
import { ProductStyles } from '../../pages/styles'
import { Translation } from '../../../i18n/Translation'
import { PricingReviewStatus } from '../../model/review-status'
import { ChannelPrice, Price } from '../../model/price'
import { ResourceSkus } from '../../../../shared/model/resourceSkus'
import { Locale } from '../../../i18n/Locale'
import { withCurrency } from '../../../../util/withCurrency'
import ReviewStatusRow from './ReviewStatusRow/ReviewStatusRow'
import { convertFromCents } from '../../../../util/convertFromCents'
import { withPercentage } from '../../../../util/withPercentage'
import { useUserPermissions } from '../../../auth/useUserPermissions'
import {
  SideBySideTable,
  SideBySideTableColumn,
  SideBySideTableRow,
  TableSectionHeadline,
} from '../../../common/components/SideBySideTable/SideBySideTable'
import { NavLink } from 'react-router-dom'
import { Routes, Routes as AppRoutes } from '../../../routing/Routes'
import { ProductVariant } from '../../model/product-variant'

const { FullWidthSection, SectionHeading } = ProductStyles

interface Props {
  pricingFormFields: ChannelPrice[]
  pricingDraftChanges: ChannelPrice[]
  reviewStatuses?: PricingReviewStatus[]
  resourceSkus?: ResourceSkus
  reloadProduct?: () => void
  draftVariant?: ProductVariant
}

const PricingChangesView = ({
  draftVariant,
  pricingDraftChanges,
  pricingFormFields,
  reviewStatuses,
  resourceSkus,
  reloadProduct,
}: Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const { canReviewPricing } = useUserPermissions()

  const getStatusValues = useCallback(
    (channelName: string) => {
      const formValue = pricingFormFields.find((value) => channelName === value.channelName)
      const draftValue = pricingDraftChanges.find((value) => channelName === value.channelName)
      return [formValue, draftValue]
    },
    [pricingDraftChanges, pricingFormFields],
  )

  const isPrice = (field: string | number | Price): field is Price => {
    return (field as Price)?.centAmount !== undefined
  }

  const getValue = useCallback(
    (
      fieldName:
        | 'takeAwayPrice'
        | 'eatInPrice'
        | 'eatInTax'
        | 'deliveryPrice'
        | 'deliveryTax'
        | 'takeAwayClubPret'
        | 'eatInClubPret',
      formValue?: ChannelPrice,
    ) => {
      const field = formValue?.[fieldName]!
      if (isPrice(field)) {
        return withCurrency({
          locale,
          currency: field.currencyCode,
          value: convertFromCents(field.centAmount),
        })
      }
      return withPercentage({ locale, value: field })
    },
    [locale],
  )

  if (draftVariant?.changesCount?.pricing === 0 || !reviewStatuses?.length) {
    return null
  }

  return (
    <FullWidthSection>
      <SectionHeading data-cy="section-heading">
        {translate('productVariantPricing.variantPricing')}
      </SectionHeading>

      <SideBySideTable>
        <SideBySideTableRow>
          <SideBySideTableColumn>
            <TableSectionHeadline marginTop={false}>
              {translate('productGroupMarketingPage.currentColumnHeadline')}
            </TableSectionHeadline>
          </SideBySideTableColumn>

          <SideBySideTableColumn>
            <TableSectionHeadline marginTop={false}>
              {translate('productGroupMarketingPage.draftColumnHeadline')}
            </TableSectionHeadline>

            <NavLink
              to={AppRoutes.resolveProductVariantRoute(
                Routes.ProductVariant.pricing,
                resourceSkus?.masterSku!,
                resourceSkus?.variantSku!,
                true,
              )}
              data-testid="edit-button"
            >
              {translate('product.editButton')}
            </NavLink>
          </SideBySideTableColumn>
        </SideBySideTableRow>

        {reviewStatuses.map((status, index) => {
          const [formValue, draftValue] = getStatusValues(status.value.channelName)

          return (
            <ReviewStatusRow
              key={`review-${index}`}
              fieldName="prices"
              fieldValue={status.value}
              title={formValue?.channelLabel[locale]}
              valueLabel={translate(`productVariantPricing.${status.value.field}`)}
              value={getValue(status.value.field, formValue)}
              draftValue={getValue(status.value.field, draftValue)}
              reviewStatus={status}
              resourceSkus={resourceSkus}
              testSelector="pricing-row"
              reloadProduct={reloadProduct}
              canApproveChanges={canReviewPricing}
            />
          )
        })}
      </SideBySideTable>
    </FullWidthSection>
  )
}

export default PricingChangesView
