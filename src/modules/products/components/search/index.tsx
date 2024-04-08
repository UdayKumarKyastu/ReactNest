import React, {
  ChangeEventHandler,
  ReactEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Cross, LoadingIndicator } from '@pretamanger/component-library'
import { SearchStyles } from './styles'
import { Translation } from '../../../i18n/Translation'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'

export declare namespace Search {
  export type Props = {
    isSearching?: boolean
    onSearch: (query: string, propertyName: string) => void
    onClear?: () => void
    query?: string
    propertyName?: string
    parametersNames?: string[]
    searchProperties?: { key: string; value: string; label: string }[]
  }
}

const {
  ClearSearchButton,
  IconContainer,
  InputWrapper,
  SearchButton,
  SearchForm,
  SearchInput,
  PropertySelectWrapper,
} = SearchStyles

export const Search = ({
  isSearching = false,
  onSearch,
  onClear,
  query = '',
  propertyName = 'name',
  parametersNames,
  searchProperties,
}: Search.Props) => {
  const { translate } = Translation.useTranslation()

  const [searchTerm, setSearchTerm] = useState(query)
  const [searchProperty, setSearchProperty] = useState(propertyName)

  useEffect(() => {
    setSearchTerm(query)
    setSearchProperty(propertyName)
  }, [propertyName, query])

  const onSearchTermChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  const handleSubmit: ReactEventHandler = useCallback(
    (e) => {
      e.preventDefault()

      if (!searchTerm?.length) {
        return
      }

      onSearch(searchTerm, searchProperty)
    },
    [searchTerm, onSearch, searchProperty],
  )

  const handleClear = useCallback(() => {
    setSearchTerm('')
    onClear?.()
  }, [onClear])

  const selectOptions = useMemo(() => {
    const [option1, option2, option3] = parametersNames || [
      'product-name',
      'sku',
      'hamilton-grant-id',
    ]
    return [
      { key: '1', value: 'name', label: translate(option1), visible: !!option1 },
      { key: '2', value: 'sku', label: translate(option2), visible: !!option2 },
      { key: '3', value: 'hgCode', label: translate(option3), visible: !!option3 },
    ].filter(({ visible }) => visible)
  }, [translate, parametersNames])

  return (
    <SearchForm onSubmit={handleSubmit}>
      <InputWrapper>
        <PropertySelectWrapper>
          <Dropdown
            id="property-select"
            label=""
            value={(searchProperties || selectOptions).find(
              (option) => option.value === searchProperty,
            )}
            options={searchProperties || selectOptions}
            onChange={(option: { value: string; label: string }) => {
              setSearchProperty(option.value)
            }}
          />
        </PropertySelectWrapper>
        <SearchInput
          label={translate('search-input-label')}
          onChange={onSearchTermChange}
          value={searchTerm}
          id="btnSearch"
          placeholder={translate('search-input-placeholder')}
        />
        {searchTerm?.length ? (
          <ClearSearchButton
            type="button"
            onClick={handleClear}
            data-testid="search-clear-button"
            data-cy="search-clear-button"
          >
            <Cross colour="grey-900" />
          </ClearSearchButton>
        ) : null}
      </InputWrapper>
      <SearchButton
        type="submit"
        onClick={handleSubmit}
        disabled={isSearching}
        data-cy="search-button"
        data-testid="search-button"
      >
        <LoadingIndicator size="small" on={isSearching}>
          <LoadingIndicator.On />
          <LoadingIndicator.Off>
            <IconContainer>{translate('search-button')}</IconContainer>
          </LoadingIndicator.Off>
        </LoadingIndicator>
      </SearchButton>
    </SearchForm>
  )
}
