import React, { FC, useMemo, useCallback } from 'react'
import { Column, CellProps } from 'react-table'
import { Chevron } from '@pretamanger/component-library'
import { ProductsTable } from '../../../home/components/ProductsTable/ProductsTable'
import { Translation } from '../../../i18n/Translation'
import { ProductsTableStyles } from '../../../home/components/ProductsTable/ProductsTable.styles'
import { ProductNameCell } from '../../../home/components/ProductNameCell/ProductNameCell'
import { Locale } from '../../../i18n/Locale'
import { NoDataNotice } from '../../../home/components/NoDataNotice/NoDataNotice'
import { Routes } from '../../../routing/Routes'
import { ProductSearchItem } from '../../../product/model/product-search-result'
import { StatusCell } from '../StatusCell/StatusCell'
import { VisibilityCell } from '../VisibilityCell/VisibilityCell'
import MagnifyIcon from '../../../../icons/Magnify'

export namespace SearchResultsTable {
  export interface Props {
    data: ProductSearchItem[]
    onRowClick?: (row: SearchResultRow) => void
  }

  export type SearchResultRow = {
    name: React.ReactElement
    recipeID: string
    productSku: string
    createdAt: string
    status: React.ReactElement
    visibility: React.ReactElement
    subRows?: SearchResultRow[]
  }
}

const { ToggleArrow } = ProductsTableStyles

const placeholderImage =
  'https://images.ctfassets.net/4zu8gvmtwqss/4EPVs5nOqNrgQvC6ckU9G2/69134074a3bbcafa293a8ea578e4aed3/Placeholder.svg?fm=jpg&fl=progressive&w=502'

export const SearchResultsTable: FC<SearchResultsTable.Props> = ({ data, onRowClick }) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { navigateToProduct, navigateToProductVariant } = Routes.useNavigation()

  const currentRoute = useMemo(() => {
    return `${window.location.pathname}${window.location.search}`
  }, [])

  const columns: Column<SearchResultsTable.SearchResultRow>[] = useMemo(
    () => [
      {
        id: 'expander',
        /* eslint-disable react/display-name */
        Cell: (props: CellProps<SearchResultsTable.SearchResultRow>) => {
          if (props.row.canExpand) {
            return (
              <ToggleArrow {...props.row.getToggleRowExpandedProps()}>
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
        Header: translate('productSearch.product'),
        accessor: 'name',
      },
      {
        Header: translate('productSearch.recipeID'),
        accessor: 'recipeID',
      },
      {
        Header: translate('productSearch.productSku'),
        accessor: 'productSku',
      },
      {
        Header: translate('productSearch.createdOn'),
        accessor: 'createdAt',
      },
      {
        Header: translate('productSearch.productStatus'),
        accessor: 'status',
      },
      {
        Header: translate('productSearch.visibility'),
        accessor: 'visibility',
      },
    ],
    [translate],
  )

  const mapProductToTableRowData = useCallback(
    (product: ProductSearchItem): SearchResultsTable.SearchResultRow => {
      return {
        name: (
          <ProductNameCell
            name={product.name[locale]}
            imageUrl={product.imageUrl || placeholderImage}
            onClick={() =>
              navigateToProduct(product.sku, 'navigationRoot', { productListUrl: currentRoute })
            }
            countryCode={product.countryCode}
            variantsCount={product.variants?.length!}
            type="group"
          />
        ),
        recipeID: translate('productSearch.allProductIds'),
        productSku: translate('productSearch.allProductSkus'),
        createdAt:
          product.createdAt && new Intl.DateTimeFormat(locale).format(new Date(product.createdAt)),
        status: <StatusCell published={product.published} />,
        visibility: (
          <VisibilityCell
            visible={product.visibleOnWebsite}
            activeVariants={product.visibleOnWebsiteVariants}
          />
        ),
        subRows: product.variants?.map((variant) => ({
          name: (
            <ProductNameCell
              name={variant.name[locale]}
              imageUrl={variant.imageUrl || placeholderImage}
              countryCode={variant.countryCode}
              onClick={() => navigateToProductVariant(product.sku, variant.sku)}
              type={variant.type}
            />
          ),
          recipeID: variant.hgCode!,
          productSku: variant.sku,
          createdAt:
            variant.createdAt &&
            new Intl.DateTimeFormat(locale).format(new Date(variant.createdAt)),
          status: <StatusCell published={variant.published} />,
          visibility: <VisibilityCell visible={variant.visibleOnWebsite} />,
        })),
      }
    },
    [currentRoute, locale, navigateToProduct, navigateToProductVariant, translate],
  )

  const mappedData = useMemo(
    () =>
      data?.map((product) => {
        return mapProductToTableRowData(product)
      }),
    [mapProductToTableRowData, data],
  )

  if (!data) {
    return null
  }

  if (mappedData?.length === 0) {
    return (
      <NoDataNotice
        title={translate('productNotifications.noProductsFound')}
        description={translate('productNotifications.pleaseDoubleCheck')}
        icon={<MagnifyIcon />}
      />
    )
  }

  return (
    <ProductsTable<SearchResultsTable.SearchResultRow>
      columns={columns}
      data={mappedData!}
      onRowClick={onRowClick}
      manualPagination
    />
  )
}
