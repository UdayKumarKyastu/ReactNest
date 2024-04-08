import React, { useMemo } from 'react'
import { ProductsListStyles } from './ProductsList.styles'
import { Translation } from '../../../i18n/Translation'
import { ProductSearchItem } from '../../../product/model/product-search-result'
import { Pagination } from '../../../home/components/Pagination/Pagination'
import { SearchResultsTable } from '../SearchResultsTable/SearchResultsTable'
import CountryFilter from '../CountryFilter/CountryFilter'

export declare namespace ProductsList {
  export type Props = {
    products: ProductSearchItem[]
    totalCount: number
    limit: number
    page: number
    setPage: (page: number) => void
    setLimit: (limit: number) => void
    country: string
    setCountry: (countryCode: string) => void
  }
}

const { ResultsCount, Toolbar, Wrapper } = ProductsListStyles

export const ProductsList = ({
  products,
  totalCount,
  limit,
  page,
  setLimit,
  setPage,
  country,
  setCountry,
}: ProductsList.Props) => {
  const { translate } = Translation.useTranslation()

  const pageCount = useMemo(() => {
    return Math.ceil(totalCount / limit)
  }, [totalCount, limit])

  return (
    <Wrapper>
      <Toolbar>
        <ResultsCount data-cy="search-results-header">
          {`${totalCount} ${translate('productSearch.results')}`}
        </ResultsCount>

        <CountryFilter onChange={setCountry} value={country} />
      </Toolbar>
      <SearchResultsTable data={products} />
      <Pagination
        pageCount={pageCount}
        goToPage={(page) => setPage(page + 1)}
        setPageSize={setLimit}
        pageSize={limit}
        pageIndex={page - 1}
        canNextPage={page < pageCount}
        canPreviousPage={page > 1}
      />
    </Wrapper>
  )
}
