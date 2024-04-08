import React from 'react'
import { Confirmation } from '@pretamanger/component-library'
import { Version as VersionIcon } from '../../../../icons/Version'
import { ProductCardStyles } from './ProductCard.styles'
import { Translation } from '../../../i18n/Translation'
import { FlagIcon } from '../../../../icons/FlagIcon'
import { Locale } from '../../../i18n/Locale'
import { LiveStatus } from '../../model/live-status'
import { ProductBadge } from '../../components/ProductBadge/ProductBadge'
import { formatDateToLocale } from '../../../../util/formatDateToLocale'
import VariantsCounter from './VariantsCounter/VariantsCounter'
import { RecipeStatusWithIcon } from './RecipeStatusWithIcon/RecipeStatusWithIcon'
import { RecipeStatus } from '../../../../shared/model/recipe-status'
import { CircleCross } from '../../../../icons/CircleCross'

export declare namespace ProductCard {
  export type Props = {
    variantSku: string
    masterSku: string
    lastSyncDate: string | null
    createdOn: string | null
    hgProductCode: string | null
    countryCode: keyof typeof FlagIcon
    status: LiveStatus
    published: boolean
    recipeStatus?: RecipeStatus
    activeVariants?: number
    variantsCount?: number
    versionsCount?: number
    imageUrl?: string
    isVariant?: boolean
    isMaster?: boolean
    versionNumber?: number | null
    variantNumber?: number
    view: 'version' | 'variant' | 'master' | 'product-group'
  }
}

const {
  Wrapper,
  Image,
  Column,
  AttributeLabel,
  AttributeValue,
  CountryWrapper,
  AdditionalInfo,
  IconWithText,
  BrandSiteWrapper,
} = ProductCardStyles

const placeholderImage =
  'https://images.ctfassets.net/4zu8gvmtwqss/4EPVs5nOqNrgQvC6ckU9G2/69134074a3bbcafa293a8ea578e4aed3/Placeholder.svg?fm=jpg&fl=progressive&w=502'

export const ProductCard = ({
  masterSku,
  variantSku,
  imageUrl = placeholderImage,
  variantsCount,
  createdOn,
  countryCode = 'UK',
  lastSyncDate,
  hgProductCode = '-',
  status,
  activeVariants,
  published,
  versionNumber = null,
  view,
  versionsCount,
  variantNumber,
  recipeStatus,
}: ProductCard.Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const Flag = FlagIcon[countryCode]

  return (
    <Wrapper data-cy="product-card">
      <Image alt="Image" src={imageUrl} />
      <Column>
        <div>
          <AttributeLabel>{translate('product.recipeID')}:</AttributeLabel>
          <AttributeValue data-cy="product-card-hgcode">{hgProductCode}</AttributeValue>
        </div>
        <div>
          <AttributeLabel>{translate('product.productSku')}:</AttributeLabel>
          <AttributeValue data-cy="product-card-sku">{variantSku}</AttributeValue>
        </div>
        <AdditionalInfo data-cy="country-indicator">
          <CountryWrapper>
            {Flag && <Flag size={18} />}
            <span>{countryCode}</span>
          </CountryWrapper>
          {(variantsCount || versionsCount) && (
            <VariantsCounter
              variantSku={variantSku}
              masterSku={masterSku}
              variantsCount={variantsCount}
              versionsCount={versionsCount}
              versionNumber={versionNumber}
              variantNumber={variantNumber}
              view={view}
            />
          )}
        </AdditionalInfo>
      </Column>
      <Column>
        <div>
          <AttributeLabel>{translate('product.recipeLastUpdated')}:</AttributeLabel>
          <AttributeValue data-cy="product-card-lastsync">
            {lastSyncDate ? formatDateToLocale(lastSyncDate, locale) : 'N/A'}
          </AttributeValue>
        </div>
        <div>
          <AttributeLabel>{translate('product.createdOn')}:</AttributeLabel>
          <AttributeValue data-cy="product-card-created">
            {createdOn ? formatDateToLocale(createdOn, locale) : 'N/A'}
          </AttributeValue>
        </div>
        {recipeStatus && (
          <div>
            <AttributeLabel>{translate('product.recipeStatus')}:</AttributeLabel>
            <AttributeValue>
              <RecipeStatusWithIcon recipeStatus={recipeStatus} />
            </AttributeValue>
          </div>
        )}
      </Column>
      <Column>
        <BrandSiteWrapper data-cy="product-card-brand-site">
          {status === LiveStatus.ACTIVE ? (
            <ProductBadge.Default variant="green">
              {`${translate('product.brandSite')}: ${
                Boolean(activeVariants) ? activeVariants : translate('product.on')
              }`}
            </ProductBadge.Default>
          ) : (
            <ProductBadge.Default variant="red">
              {`${translate('product.brandSite')}: ${translate('product.off')}`}
            </ProductBadge.Default>
          )}
        </BrandSiteWrapper>

        <AdditionalInfo data-cy="product-card-additional-info">
          {versionNumber && (
            <IconWithText>
              <VersionIcon />
              {`${translate('product.version')} ${versionNumber}`}
            </IconWithText>
          )}
          {published ? (
            <IconWithText>
              <Confirmation width="16px" height="16px" />
              {translate('product.published')}
            </IconWithText>
          ) : (
            <IconWithText>
              <CircleCross width="16px" height="16px" />
              {translate('product.unpublished')}
            </IconWithText>
          )}
        </AdditionalInfo>
      </Column>
    </Wrapper>
  )
}
