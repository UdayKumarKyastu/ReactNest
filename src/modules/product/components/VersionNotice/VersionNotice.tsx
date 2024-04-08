import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { Routes } from '../../../routing/Routes'
import { Locale } from '../../../i18n/Locale'
import { ProductVariantVersion } from '../../model/product-variant'
import { ProductStyles } from '../../pages/styles'
import { VariantVersionPublishState } from '../../model/variant-version-publish-state'

const { StyledLink } = ProductStyles

export declare namespace VersionNotice {
  export type Props = {
    productVariant: ProductVariantVersion
    pubblishState: VariantVersionPublishState
  }
}

export const VersionNotice = ({ productVariant, pubblishState }: VersionNotice.Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  if (pubblishState === VariantVersionPublishState.CURRENT) {
    return null
  }

  const getVersionNoticeTitle = (pubblishState: VariantVersionPublishState) => {
    switch (pubblishState) {
      case VariantVersionPublishState.PREVIOUS:
        return translate('variantVersionsPage.previousVersionNoticeTitle')
      case VariantVersionPublishState.FUTURE:
        return translate('variantVersionsPage.futureVersionNoticeTitle')
      default:
        return ''
    }
  }

  const getVersionNoticeDescription = (pubblishState: VariantVersionPublishState) => {
    switch (pubblishState) {
      case VariantVersionPublishState.PREVIOUS:
        return 'variantVersionsPage.previousVersionNoticeDescription'
      case VariantVersionPublishState.FUTURE:
        return 'variantVersionsPage.futureVersionNoticeDescription'
      default:
        return ''
    }
  }

  const title = getVersionNoticeTitle(pubblishState)
  const description = getVersionNoticeDescription(pubblishState)

  return (
    <Notice
      title={title}
      variant="info"
      description={
        <div>
          <span>
            {translate(description, {
              name: productVariant.name?.[locale],
              version: productVariant.version.toString(),
              fromDate: productVariant.availability.liveSchedule.on
                ? new Intl.DateTimeFormat(locale).format(
                    new Date(productVariant.availability.liveSchedule.on),
                  )
                : 'N/A',
              untilDate: productVariant.availability.liveSchedule.off
                ? new Intl.DateTimeFormat(locale).format(
                    new Date(productVariant.availability.liveSchedule.off),
                  )
                : 'N/A',
            })}
          </span>
          <StyledLink
            to={Routes.resolveProductVariantRoute(
              Routes.ProductVariant.navigationRoot,
              productVariant.masterSku,
              productVariant.sku,
            )}
          >
            {translate('variantVersionsPage.seeCurrentVersion')}
          </StyledLink>
        </div>
      }
    />
  )
}
