import React, { useCallback, useEffect } from 'react'
import { ProductsPageStyles } from './ProductsPage.styles'

import { Search } from '../components/search'
import { ProductsList } from '../components/ProductsList/ProductsList'
import { useGlobalSearchQuery } from '../../search/state/useGlobalSearchQuery'
import { Translation } from '../../i18n/Translation'
import { useProductSearch } from '../../search/useProductSearch'

const { Heading, Wrapper } = ProductsPageStyles

export const ProductsPage = () => {
  const { translate } = Translation.useTranslation()
  const { reset, products, search, isLoading, total } = useProductSearch()

  const {
    query,
    setQuery,
    propertyName,
    setPropertyName,
    limit,
    page,
    setPage,
    setLimit,
    country,
    setCountry,
  } = useGlobalSearchQuery()

  const handleClear = () => {
    setQuery('')
    reset()
  }

  useEffect(() => {
    if (query && propertyName) {
      search(query, propertyName, limit, page, country)
    }
  }, [query, search, propertyName, limit, page, country])

  const onSearch = useCallback(
    (query: string, property: string) => {
      setPage(1)
      setQuery(query)
      setPropertyName(property)
    },
    [setPage, setQuery, setPropertyName],
  )

  return (
    <Wrapper>
      <Heading data-cy="search-page-header">{translate('products-page-header')}</Heading>
      {query !== null && (
        <Search
          onSearch={onSearch}
          onClear={handleClear}
          isSearching={isLoading}
          query={query}
          propertyName={propertyName}
        />
      )}
      {query !== null && products && (
        <ProductsList
          products={products}
          totalCount={total}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          country={country!}
          setCountry={setCountry}
        />
      )}
    </Wrapper>
  )
}
