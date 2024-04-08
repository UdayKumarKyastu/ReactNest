import React from 'react'
import { CustomerDetailsPageStyles } from './CustomerDetailsPage.styles'
import { Chevron } from '@pretamanger/component-library'
import { useNavigate } from 'react-router-dom'
import { Translation } from '../../../i18n/Translation'
import CustomerDetails from '../../components/CustomerDetails/CustomerDetails'
import { CustomerDetailsState } from '../../state/CustomerDetailsState'

const { Wrapper, BackToSearchButton } = CustomerDetailsPageStyles

const CustomerDetailsPage = () => {
  const navigate = useNavigate()
  const { translate } = Translation.useTranslation()

  return (
    <CustomerDetailsState.Provider>
      <Wrapper>
        <nav>
          <BackToSearchButton onClick={() => navigate('/')}>
            <Chevron type="left" />
            {translate('customerDetails.backToSearch')}
          </BackToSearchButton>
        </nav>

        <section>
          <CustomerDetails />
        </section>
      </Wrapper>
    </CustomerDetailsState.Provider>
  )
}

export default CustomerDetailsPage
