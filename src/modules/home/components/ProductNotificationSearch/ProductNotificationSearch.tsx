import React, { useCallback } from 'react'
import { ProductNotificationSearchStyles } from './ProductNotificationSearch.styles'
//@ts-ignore
import BackgroundImage from '../../../../images/landing_page_background.png'
import { Translation } from '../../../i18n/Translation'
import { Search } from '../../../../modules/products/components/search'
import { useNavigate } from 'react-router-dom'

const { Wrapper, InnerWrapper, Title } = ProductNotificationSearchStyles

export const ProductNotificationSearch = () => {
  const { translate } = Translation.useTranslation()
  const navigate = useNavigate()

  const onSearch = useCallback(
    (query: string, propertyName: string) => {
      navigate(`/products?p=${propertyName}&q=${query}&page=1`)
    },
    [navigate],
  )

  return (
    <Wrapper>
      <img src={BackgroundImage} />
      <InnerWrapper data-cy="search-section">
        <Title>{translate('productNotifications.lookingForAProduct')}</Title>
        <Search onSearch={onSearch} />
      </InnerWrapper>
    </Wrapper>
  )
}
