import { ReactElement, useCallback, useMemo, useState } from 'react'
import { Translation } from '../../../i18n/Translation'
import { ProductNotificationsStyles } from './ProductNotifications.styles'
import { Locale } from '../../../i18n/Locale'
import { PendingReviewProductsTable } from '../PendingReviewProductsTable/PendingReviewProductsTable'
import { NewProductsTable } from '../NewProductsTable/NewProductsTable'
import { LiveSoonProductsTable } from '../LiveSoonProductsTable/LiveSoonProductsTable'
import { DelistSoonProductsTable } from '../DelistSoonProductsTable/DelistSoonProductsTable'
import { usePendingReviewProducts } from '../../api/usePendingReviewProducts'
import { useNewProducts } from '../../api/useNewProducts'
import { useLiveSoonProducts } from '../../api/useLiveSoonProducts'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { CountryCode } from '../../../../shared/model/country-code'
import { FlagIcon } from '../../../../icons/FlagIcon'
import { PendingReviewProductGroup } from '../../model/pending-review-product'
import { NewProductGroup } from '../../model/new-product'
import { LiveSoonProductGroup } from '../../model/live-soon-product'
import LoadingSpinner from '../../../../modules/common/components/LoadingSpinner/LoadingSpinner'
import useFilterProducts from './useFilterProducts'
import { useDelistSoonProducts } from '../../api/useDelistSoonProducts'
import { DelistSoonProductGroup } from '../../model/delist-soon-product'

export declare namespace ProductNotifications {
  export type Props = {
    query?: string
  }

  export interface CountryOption {
    key: string
    label: ReactElement
  }

  export interface FilteredVariant {
    recipeID: string | null
    sku: string
    name: Locale.MultilangString
    versions?: FilteredVariant[]
  }

  export interface FilteredProduct {
    name: Locale.MultilangString
    variants: FilteredVariant[]
  }
}

enum TableType {
  PENDING = 'PENDING',
  NEW = 'NEW',
  LIVE_SOON = 'LIVE_SOON',
  DELIST_SOON = 'DELIST_SOON',
}

const {
  Title,
  Wrapper,
  TableSwitchContainer,
  TableSwitch,
  CountryOptionLabel,
  TopBar,
  CountryDropdownWrapper,
} = ProductNotificationsStyles

const countrySelectOptions: ProductNotifications.CountryOption[] = Object.keys(CountryCode).map(
  (key) => {
    const Flag = FlagIcon[key as CountryCode]

    return {
      key: key,
      label: (
        <CountryOptionLabel>
          <Flag size={18} /> {key}
        </CountryOptionLabel>
      ),
    }
  },
)

export const ProductNotifications = ({ query = '' }: ProductNotifications.Props) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const [country, setCountry] = useState(CountryCode.UK)
  const [activeTable, setActiveTable] = useState(TableType.PENDING)
  const { data: pendingReviewProducts, isFetching: isPendingLoading } = usePendingReviewProducts({
    country,
  })
  const { data: newProducts, isFetching: isNewLoading } = useNewProducts({ country })
  const { data: liveSoonProducts, isFetching: isLiveLoading } = useLiveSoonProducts({ country })
  const { data: delistSoonProducts, isFetching: isDelistLoading } = useDelistSoonProducts({
    country,
  })
  const filterProducts = useFilterProducts()

  const handleCountryChange = (option: ProductNotifications.CountryOption) => {
    setCountry(option.key as CountryCode)
  }

  const filteredPendingReviewProducts = useMemo(() => {
    return pendingReviewProducts ? filterProducts(pendingReviewProducts, query, locale) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, pendingReviewProducts, query])

  const filteredNewProducts = useMemo(() => {
    return newProducts ? filterProducts(newProducts, query, locale) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, newProducts, query])

  const filteredLiveSoonProducts = useMemo(() => {
    return liveSoonProducts ? filterProducts(liveSoonProducts, query, locale) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveSoonProducts, query, locale])

  const filteredDelistSoonProducts = useMemo(() => {
    return delistSoonProducts ? filterProducts(delistSoonProducts, query, locale) : []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delistSoonProducts, query, locale])

  const getTabSwitch = useCallback(
    (type: TableType, title: string, isLoading: boolean, value?: number) => (
      <TableSwitch onClick={() => setActiveTable(type)} active={activeTable === type}>
        {translate(title)}{' '}
        {!isLoading ? <span className="results-count">{value || 0}</span> : <LoadingSpinner />}
      </TableSwitch>
    ),
    [activeTable, translate],
  )

  return (
    <Wrapper>
      <Title>{translate('productNotifications.productNotifications')}</Title>
      <TopBar>
        <TableSwitchContainer>
          {getTabSwitch(
            TableType.PENDING,
            'productNotifications.pendingReview',
            isPendingLoading,
            filteredPendingReviewProducts?.length,
          )}
          {getTabSwitch(
            TableType.NEW,
            'productNotifications.new',
            isNewLoading,
            filteredNewProducts?.length,
          )}
          {getTabSwitch(
            TableType.LIVE_SOON,
            'productNotifications.liveSoon',
            isLiveLoading,
            filteredLiveSoonProducts?.length,
          )}
          {getTabSwitch(
            TableType.DELIST_SOON,
            'productNotifications.delistSoon',
            isDelistLoading,
            filteredDelistSoonProducts?.length,
          )}
        </TableSwitchContainer>
        <CountryDropdownWrapper data-cy="country-dropdown-wrapper">
          <Dropdown
            id="countrySelect"
            label="Select country"
            options={countrySelectOptions}
            onChange={handleCountryChange}
            value={countrySelectOptions.find((option) => option.key === country)}
          />
        </CountryDropdownWrapper>
      </TopBar>
      {activeTable === TableType.PENDING && (
        <PendingReviewProductsTable
          isLoading={isPendingLoading}
          data={filteredPendingReviewProducts! as PendingReviewProductGroup[]}
        />
      )}
      {activeTable === TableType.NEW && (
        <NewProductsTable
          isLoading={isNewLoading}
          data={filteredNewProducts! as NewProductGroup[]}
        />
      )}
      {activeTable === TableType.LIVE_SOON && (
        <LiveSoonProductsTable
          isLoading={isLiveLoading}
          data={filteredLiveSoonProducts! as LiveSoonProductGroup[]}
        />
      )}
      {activeTable === TableType.DELIST_SOON && (
        <DelistSoonProductsTable
          isLoading={isDelistLoading}
          data={filteredDelistSoonProducts! as DelistSoonProductGroup[]}
        />
      )}
    </Wrapper>
  )
}
