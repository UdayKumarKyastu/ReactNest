import { FC, useMemo, useCallback } from 'react'
import { Column, CellProps } from 'react-table'
import { Chevron, Star } from '@pretamanger/component-library'
import { ProductsTable } from '../ProductsTable/ProductsTable'
import { Translation } from '../../../i18n/Translation'
import { ProductsTableStyles } from '../ProductsTable/ProductsTable.styles'
import { ProductNameCell } from '../ProductNameCell/ProductNameCell'
import { Locale } from '../../../i18n/Locale'
import { NewProductGroup } from '../../model/new-product'
import { NoDataNotice } from '../NoDataNotice/NoDataNotice'
import { Routes } from '../../../routing/Routes'
import LoadingState from '../LoadingState/LoadingState'

export namespace NewProductsTable {
  export interface Props {
    data: NewProductGroup[]
    onRowClick?: (row: NewProductRow) => void
    isLoading: boolean
  }

  export type NewProductRow = {
    name: React.ReactElement
    recipeID: string
    productSku: string
    createdAt: React.ReactElement
    subRows?: NewProductRow[]
  }
}

const { ToggleArrow, CellWithIcon } = ProductsTableStyles

const formatDate = (dateString: string, locale: Locale.Lang) => {
  const date = new Date(dateString)
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date)
  const day = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date)

  return `${weekday} ${day} ${month} ${year}`
}

const placeholderImage =
  'https://images.ctfassets.net/4zu8gvmtwqss/4EPVs5nOqNrgQvC6ckU9G2/69134074a3bbcafa293a8ea578e4aed3/Placeholder.svg?fm=jpg&fl=progressive&w=502'

export const NewProductsTable: FC<NewProductsTable.Props> = ({ data, onRowClick, isLoading }) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { navigateToProduct, navigateToProductVariant, navigateToProductVariantVersion } =
    Routes.useNavigation()

  const columns: Column<NewProductsTable.NewProductRow>[] = useMemo(
    () => [
      {
        id: 'expander',
        /* eslint-disable react/display-name */
        Cell: (props: CellProps<NewProductsTable.NewProductRow>) => {
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
        Header: translate('productNotifications.newProducts'),
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
        Header: translate('productNotifications.variantAdded'),
        accessor: 'createdAt',
      },
    ],
    [translate],
  )

  const mapProductToTableRowData = useCallback(
    (product: NewProductGroup): NewProductsTable.NewProductRow => {
      const variants = product.variants.length
      const versions = product.variants.reduce((total, variant) => {
        return total + variant.versions.length
      }, 0)

      return {
        name: (
          <ProductNameCell
            name={product.name[locale]}
            imageUrl={product.imageUrl || placeholderImage}
            onClick={() => navigateToProduct(product.sku)}
            countryCode={product.countryCode}
            variantsCount={product.variants?.length!}
            type="group"
          />
        ),
        recipeID: translate('productNotifications.allProductIds'),
        productSku: translate('productNotifications.allProductSkus'),
        createdAt: (
          <div>
            {variants > 0 && (
              <CellWithIcon>
                <Star width="14px" height="14px" />
                {`${variants} ${translate('productNotifications.variants')}`}
              </CellWithIcon>
            )}
            {versions > 0 && (
              <CellWithIcon>
                <Star width="14px" height="14px" />
                {`${versions} ${translate('productNotifications.versions')}`}
              </CellWithIcon>
            )}
          </div>
        ),
        subRows: product.variants.map((variant) => ({
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
          createdAt: (
            <CellWithIcon>
              <Star width="14px" height="14px" />
              {formatDate(variant.createdAt, locale)}
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
            createdAt: (
              <CellWithIcon>
                <Star width="14px" height="14px" />
                {formatDate(version.createdAt, locale)}
              </CellWithIcon>
            ),
          })),
        })),
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
    return <NoDataNotice title={translate('productNotifications.nothingNew')} />
  }

  return (
    <ProductsTable<NewProductsTable.NewProductRow>
      columns={columns}
      data={mappedData!}
      onRowClick={onRowClick}
    />
  )
}
