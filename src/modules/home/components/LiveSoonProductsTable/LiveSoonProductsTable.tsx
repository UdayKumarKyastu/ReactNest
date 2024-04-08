import { FC, useMemo, useCallback } from 'react'
import { Column, CellProps } from 'react-table'
import { Chevron } from '@pretamanger/component-library'
import { Announcement } from '../../../../icons/Announcement'
import { ProductsTable } from '../ProductsTable/ProductsTable'
import { Translation } from '../../../i18n/Translation'
import { ProductsTableStyles } from '../ProductsTable/ProductsTable.styles'
import { ProductNameCell } from '../ProductNameCell/ProductNameCell'
import { Locale } from '../../../i18n/Locale'
import { LiveSoonProductGroup } from '../../model/live-soon-product'
import { NoDataNotice } from '../NoDataNotice/NoDataNotice'
import { Routes } from '../../../routing/Routes'
import LoadingState from '../LoadingState/LoadingState'

export namespace LiveSoonProductsTable {
  export interface Props {
    data: LiveSoonProductGroup[]
    onRowClick?: (row: LiveSoonProductsRow) => void
    isLoading: boolean
  }

  export type LiveSoonProductsRow = {
    name: React.ReactElement
    recipeID: string
    productSku: string
    liveFrom: React.ReactElement
    subRows?: LiveSoonProductsRow[]
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

export const LiveSoonProductsTable: FC<LiveSoonProductsTable.Props> = ({
  data,
  onRowClick,
  isLoading,
}) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const { navigateToProduct, navigateToProductVariant, navigateToProductVariantVersion } =
    Routes.useNavigation()

  const columns: Column<LiveSoonProductsTable.LiveSoonProductsRow>[] = useMemo(
    () => [
      {
        id: 'expander',
        /* eslint-disable react/display-name */
        Cell: (props: CellProps<LiveSoonProductsTable.LiveSoonProductsRow>) => {
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
        Header: translate('productNotifications.productsGoLiveSoon'),
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
        Header: translate('productNotifications.goLive'),
        accessor: 'liveFrom',
      },
    ],
    [translate],
  )

  const mapProductToTableRowData = useCallback(
    (product: LiveSoonProductGroup): LiveSoonProductsTable.LiveSoonProductsRow => {
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
        liveFrom: (
          <div>
            {variants > 0 && (
              <CellWithIcon>
                <Announcement />
                {`${variants} ${translate('productNotifications.variants')}`}
              </CellWithIcon>
            )}
            {versions > 0 && (
              <CellWithIcon>
                <Announcement />
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
          liveFrom: (
            <CellWithIcon>
              <Announcement />
              {formatDate(variant.liveFrom, locale)}
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
            liveFrom: (
              <CellWithIcon>
                <Announcement />
                {formatDate(version.liveFrom, locale)}
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
    return <NoDataNotice title={translate('productNotifications.nothingLiveSoon')} />
  }

  return (
    <ProductsTable<LiveSoonProductsTable.LiveSoonProductsRow>
      columns={columns}
      data={mappedData!}
      onRowClick={onRowClick}
    />
  )
}
