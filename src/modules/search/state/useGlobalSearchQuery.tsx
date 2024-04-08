import { useEffect } from 'react'
import { useSearchState } from './search.state'
import { StringParam, useQueryParam, NumberParam } from 'use-query-params'

export const useGlobalSearchQuery = () => {
  const {
    query,
    setQuery,
    setPropertyName,
    propertyName,
    limit,
    page,
    setLimit,
    setPage,
    country,
    setCountry,
  } = useSearchState()
  const [queryUrlParam = '', setQueryUrlParam] = useQueryParam('q', StringParam)
  const [propertyUrlParam = '', setPropertyUrlParam] = useQueryParam('p', StringParam)
  const [limitUrlParam = '', setLimitUrlParam] = useQueryParam('limit', NumberParam)
  const [pageUrlParam = '', setPageUrlParam] = useQueryParam('page', NumberParam)
  const [countryUrlParam = '', setCountryUrlParam] = useQueryParam('country', StringParam)

  useEffect(() => {
    if (typeof queryUrlParam === 'string') {
      setQuery(queryUrlParam)
    }

    return () => {
      setQuery('')
      setPropertyName('')
      setCountry('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof propertyUrlParam === 'string') {
      setPropertyName(propertyUrlParam)
    }
    limitUrlParam && setLimit(Number(limitUrlParam))
    pageUrlParam && setPage(Number(pageUrlParam))
    countryUrlParam && setCountry(countryUrlParam)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (query === null || query === queryUrlParam) {
      return
    }

    setQueryUrlParam(query)
  }, [query, queryUrlParam, setQueryUrlParam])

  useEffect(() => {
    if (!propertyName || propertyName === propertyUrlParam) {
      return
    }
    setPropertyUrlParam(propertyName)
  }, [propertyName, propertyUrlParam, setPropertyUrlParam])

  useEffect(() => {
    if (!limit || limit === limitUrlParam) {
      return
    }
    setLimitUrlParam(limit)
  }, [limit, limitUrlParam, setLimitUrlParam])

  useEffect(() => {
    if (!page || page === pageUrlParam) {
      return
    }
    setPageUrlParam(page)
  }, [page, pageUrlParam, setPageUrlParam])

  useEffect(() => {
    if (country === countryUrlParam) {
      return
    }
    setCountryUrlParam(country)
  }, [country, countryUrlParam, setCountryUrlParam])

  return {
    query,
    setQuery,
    limit,
    page,
    setPropertyName,
    propertyName,
    setLimit,
    setPage,
    country,
    setCountry,
  }
}
