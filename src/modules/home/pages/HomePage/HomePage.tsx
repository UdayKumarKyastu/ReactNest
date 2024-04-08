import { HomePageStyles } from './HomePage.styles'
import { ProductNotifications } from '../../components/ProductNotifications/ProductNotifications'
import { ProductNotificationSearch } from '../../components/ProductNotificationSearch/ProductNotificationSearch'

const { Wrapper, OuterWrapper } = HomePageStyles

export const HomePage = () => {
  return (
    <OuterWrapper>
      <ProductNotificationSearch />
      <Wrapper>
        <ProductNotifications />
      </Wrapper>
    </OuterWrapper>
  )
}
