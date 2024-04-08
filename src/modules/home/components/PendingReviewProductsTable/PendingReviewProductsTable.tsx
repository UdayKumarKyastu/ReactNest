import { FC, useMemo, useCallback } from 'react'
import { Column, CellProps } from 'react-table'
import { Chevron, Alert } from '@pretamanger/component-library'
import { ProductsTable } from '../ProductsTable/ProductsTable'
import { Translation } from '../../../i18n/Translation'
import { ProductsTableStyles } from '../ProductsTable/ProductsTable.styles'
import { ProductNameCell } from '../ProductNameCell/ProductNameCell'
import { Locale } from '../../../i18n/Locale'
import { PendingReviewProductGroup, PendingReviewVariant } from '../../model/pending-review-product'
import { NoDataNotice } from '../NoDataNotice/NoDataNotice'
import { Routes } from '../../../routing/Routes'
import LoadingState from '../LoadingState/LoadingState'

export namespace PendingReviewProductsTable {
  export interface Props {
    data: PendingReviewProductGroup[]
    isLoading: boolean
  }

  export type PendingReviewProductRow = {
    name: React.ReactElement
    recipeID: string
    productSku: string
    draftChanges: React.ReactElement
    subRows?: PendingReviewProductRow[]
  }
}

const { ToggleArrow, CellWithIcon } = ProductsTableStyles

const placeholderImage =
  'https://images.ctfassets.net/4zu8gvmtwqss/4EPVs5nOqNrgQvC6ckU9G2/69134074a3bbcafa293a8ea578e4aed3/Placeholder.svg?fm=jpg&fl=progressive&w=502'

export const PendingReviewProductsTable: FC<PendingReviewProductsTable.Props> = ({
  data,
  isLoading,
}) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { navigateToProduct, navigateToProductVariant, navigateToProductVariantVersion } =
    Routes.useNavigation()

  const columns: Column<PendingReviewProductsTable.PendingReviewProductRow>[] = useMemo(
    () => [
      {
        id: 'expander',
        /* eslint-disable react/display-name */
        Cell: (props: CellProps<PendingReviewProductsTable.PendingReviewProductRow>) => {
          if (props.row.canExpand) {
            return (
              <ToggleArrow
                {...props.row.getToggleRowExpandedProps()}
                data-testid={`toggle-expand-row-${props.row.id}`}
              >
                {props.row.isExpanded ? (
                  <Chevron type="down" height="12px" width="20px" />
                ) : (
                  <Chevron type="right" height="20px" width="12px" />
                )}
              </ToggleArrow>
            )
          }

          return null
        },
      },
      {
        Header: translate('productNotifications.productsPendingReview'),
        accessor: 'name',
      },
      {
        Header: translate('productNotifications.recipeID'),
        accessor: 'recipeID',
      },
      {
        Header: translate('productNotifications.productSku'),
        accessor: 'productSku',
      },
      {
        Header: translate('productNotifications.draftChanges'),
        accessor: 'draftChanges',
      },
    ],
    [translate],
  )

  const mapProductToTableRowData = useCallback(
    (product: PendingReviewProductGroup): PendingReviewProductsTable.PendingReviewProductRow => {
      return {
        name: (
          <ProductNameCell
            name={product.name[locale]}
            imageUrl={product.imageUrl || placeholderImage}
            countryCode={product.countryCode}
            onClick={() => navigateToProduct(product.sku)}
            variantsCount={product.variants?.length!}
            type="group"
          />
        ),
        recipeID: translate('productNotifications.allProductIds'),
        productSku: translate('productNotifications.allProductSkus'),
        draftChanges: (
          <CellWithIcon>
            <Alert width="14px" height="14px" />
            {product.changesCount} {translate('productNotifications.changes')}
          </CellWithIcon>
        ),
        subRows: product.variants.reduce(
          (
            acc: PendingReviewProductsTable.PendingReviewProductRow[],
            variant: PendingReviewVariant,
          ) => {
            if (variant.changesCount === 0) {
              return variant.versions.map((version) => ({
                name: (
                  <ProductNameCell
                    name={version.name[locale]}
                    imageUrl={version.imageUrl || placeholderImage}
                    countryCode={version.countryCode}
                    onClick={() =>
                      navigateToProductVariantVersion(
                        product.sku,
                        variant.sku,
                        version.versionNumber.toString(),
                      )
                    }
                    type={version.isMaster ? 'master-variant' : 'variant'}
                    version={version.versionNumber}
                  />
                ),
                recipeID: version.recipeID!,
                productSku: version.sku,
                draftChanges: (
                  <CellWithIcon>
                    <Alert width="14px" height="14px" />
                    {version.changesCount} {translate('productNotifications.changes')}
                  </CellWithIcon>
                ),
              }))
            }

            return product.variants.map((variant) => {
              return {
                name: (
                  <ProductNameCell
                    name={variant.name[locale]}
                    imageUrl={variant.imageUrl || placeholderImage}
                    countryCode={variant.countryCode}
                    onClick={() => navigateToProductVariant(product.sku, variant.sku)}
                    type={variant.isMaster ? 'master-variant' : 'variant'}
                    version={variant.versionNumber! || 1}
                  />
                ),
                recipeID: variant.recipeID!,
                productSku: variant.sku,
                draftChanges: (
                  <CellWithIcon>
                    <Alert width="14px" height="14px" />
                    {variant.changesCount} {translate('productNotifications.changes')}
                  </CellWithIcon>
                ),
                subRows: variant.versions.map((version) => ({
                  name: (
                    <ProductNameCell
                      name={version.name[locale]}
                      imageUrl={version.imageUrl || placeholderImage}
                      countryCode={version.countryCode}
                      onClick={() =>
                        navigateToProductVariantVersion(
                          product.sku,
                          variant.sku,
                          version.versionNumber.toString(),
                        )
                      }
                      type={version.isMaster ? 'master-variant' : 'variant'}
                      version={version.versionNumber}
                    />
                  ),
                  recipeID: version.recipeID!,
                  productSku: version.sku,
                  draftChanges: (
                    <CellWithIcon>
                      <Alert width="14px" height="14px" />
                      {version.changesCount} {translate('productNotifications.changes')}
                    </CellWithIcon>
                  ),
                })),
              }
            })
          },
          [],
        ),
      }
    },
    [
      locale,
      navigateToProduct,
      navigateToProductVariant,
      navigateToProductVariantVersion,
      translate,
    ],
  )

  const mappedData = useMemo(
    () =>
      data?.map((product) => {
        return mapProductToTableRowData(product)
      }),
    [mapProductToTableRowData, data],
  )

  if (isLoading) {
    return <LoadingState />
  }

  if (!data) {
    return null
  }

  if (mappedData?.length === 0) {
    return <NoDataNotice title={translate('productNotifications.nothingPendingReview')} />
  }

  return (
    <ProductsTable<PendingReviewProductsTable.PendingReviewProductRow>
      columns={columns}
      data={mappedData!}
    />
  )
}
