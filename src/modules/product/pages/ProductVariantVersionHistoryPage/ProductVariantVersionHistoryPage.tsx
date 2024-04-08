import React, { useMemo, useCallback } from 'react'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { VariantVersionsTable } from '../../components/VariantVersionsTable/VariantVersionsTable'
import { Routes } from '../../../routing/Routes'
import { Locale } from '../../../i18n/Locale'
import { Product } from '../../model/product'
import { ProductVariant } from '../../model/product-variant'
import { VariantVersionPublishState } from '../../model/variant-version-publish-state'
import { Version as VersionIcon } from '../../../../icons/Version'
import { ProductVariantVersionsHistoryPageStyles } from './ProductVariantVersionsHistoryPage.styles'

export declare namespace ProductVariantVersionHistoryPage {
  export type Props = {
    product: Product
    productVariant: ProductVariant
    versionNotice?: React.ReactElement
  }

  export type Version = {
    name: Locale.MultilangString
    sku: string
    liveFrom: string
    publishState: VariantVersionPublishState
    hgCode: string
    version: number
    id: string
  }
}

const { TabWrapper, SectionHeading, FullWidthSection, SubsectionHeading } = ProductStyles
const { NoVersionsMessageWrapper, StyledNavLink } = ProductVariantVersionsHistoryPageStyles

const mapVariantToCurrentVersion = (
  variant: ProductVariant,
): ProductVariantVersionHistoryPage.Version => {
  return {
    name: variant.name,
    sku: variant.sku,
    liveFrom: variant.availability.liveSchedule.on!,
    publishState: VariantVersionPublishState.CURRENT,
    hgCode: variant.hamiltonGrant.productCode!,
    version: variant.version,
    id: variant.sku,
  }
}

export const ProductVariantVersionHistoryPage = ({
  product,
  productVariant,
  versionNotice,
}: ProductVariantVersionHistoryPage.Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { navigateToProductVariantVersion, navigateToProductVariant } = Routes.useNavigation()

  const currentVariant =
    [...product.variants, product.masterVariant].find(
      (variant) => variant.sku === productVariant.sku,
    ) || productVariant

  const mapVersionToTableRowData = useMemo(
    () =>
      (version: ProductVariantVersionHistoryPage.Version): VariantVersionsTable.Version => {
        return {
          name: version.name[locale],
          sku: productVariant.sku || '',
          liveFrom: version.liveFrom
            ? new Intl.DateTimeFormat(locale).format(new Date(version.liveFrom))
            : '',
          status:
            version.publishState === VariantVersionPublishState.CURRENT
              ? currentVariant.published
              : false,
          hamiltonGrantID: version.hgCode || '',
          publishState: version.publishState,
          version: (
            <StyledNavLink
              to={Routes.resolveProductVariantVersionRoute(
                Routes.ProductVariantVersion.marketing,
                product.sku,
                productVariant.sku,
                version.version.toString(),
                true,
              )}
            >
              {version.version.toString()}
            </StyledNavLink>
          ),
        }
      },
    [currentVariant.published, locale, product.sku, productVariant.sku],
  )

  const currentVersion = useMemo(
    () => mapVersionToTableRowData(mapVariantToCurrentVersion(currentVariant)),
    [currentVariant, mapVersionToTableRowData],
  )

  const data = useMemo((): VariantVersionsTable.Version[] => {
    return currentVariant.versions.map((version) => mapVersionToTableRowData(version))
  }, [currentVariant.versions, mapVersionToTableRowData])

  const currentVersions = data
    .filter(({ publishState }) => publishState === VariantVersionPublishState.CURRENT)
    .sort((v1, v2) => (v1.version < v2.version ? 1 : -1))
  const futureVersions = data
    .filter(({ publishState }) => publishState === VariantVersionPublishState.FUTURE)
    .sort((v1, v2) => (v1.version < v2.version ? 1 : -1))
  const previousVersions = data
    .filter(({ publishState }) => publishState === VariantVersionPublishState.PREVIOUS)
    .sort((v1, v2) => (v1.version < v2.version ? 1 : -1))

  const onTableRowClick = useCallback(
    (versionNumber: string, publishState: VariantVersionPublishState) => {
      if (publishState === VariantVersionPublishState.CURRENT) {
        navigateToProductVariant(product.sku, product.masterVariant.sku)
      } else {
        navigateToProductVariantVersion(product.sku, productVariant.sku, versionNumber)
      }
    },
    [
      navigateToProductVariant,
      navigateToProductVariantVersion,
      product.masterVariant.sku,
      product.sku,
      productVariant.sku,
    ],
  )

  const noPreviousVersionsMessage = (
    <NoVersionsMessageWrapper withGrayBackground>
      <VersionIcon />
      {translate('variantVersionsPage.noPreviousVersionsMessage')}
    </NoVersionsMessageWrapper>
  )

  const noFutureVersionsMessage = (
    <NoVersionsMessageWrapper>
      <VersionIcon />
      {translate('variantVersionsPage.noFutureVersionsMessage')}
    </NoVersionsMessageWrapper>
  )

  return (
    <TabWrapper>
      <FullWidthSection>
        <SectionHeading data-cy="section-heading">
          {translate('variantVersionsPage.versionHistory')}
        </SectionHeading>
        {versionNotice}
        <FullWidthSection data-cy="current-version-section">
          <SubsectionHeading>{translate('variantVersionsPage.currentVersion')}</SubsectionHeading>
          <VariantVersionsTable
            data={currentVersions.length === 0 ? [currentVersion] : currentVersions}
            onRowClick={onTableRowClick}
          />
        </FullWidthSection>
        <FullWidthSection data-cy="future-version-section">
          <SubsectionHeading>{translate('variantVersionsPage.futureVersions')}</SubsectionHeading>
          {futureVersions.length > 0 ? (
            <VariantVersionsTable data={futureVersions} onRowClick={onTableRowClick} />
          ) : (
            noFutureVersionsMessage
          )}
        </FullWidthSection>
        <FullWidthSection data-cy="previous-version-section">
          <SubsectionHeading>{translate('variantVersionsPage.previousVersions')}</SubsectionHeading>
          {previousVersions.length > 0 ? (
            <VariantVersionsTable
              data={previousVersions}
              onRowClick={onTableRowClick}
              withGrayBackground
            />
          ) : (
            noPreviousVersionsMessage
          )}
        </FullWidthSection>
      </FullWidthSection>
    </TabWrapper>
  )
}
