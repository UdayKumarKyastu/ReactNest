import { Translation } from '../../../i18n/Translation'
import { NoInformationAvailableMessageStyles } from './NoInformationAvailableMessage.styles'
import { NoInformation } from '../../../../icons/NoInformation'

const { Wrapper, Title, Description, IconWrapper } = NoInformationAvailableMessageStyles

export const NoInformationAvailableMessage = () => {
  const { translate } = Translation.useTranslation()

  return (
    <Wrapper>
      <IconWrapper>
        <NoInformation />
      </IconWrapper>
      <Title>{translate('noInformationAvailableMessage.title')}</Title>
      <Description>{translate('noInformationAvailableMessage.description')}</Description>
    </Wrapper>
  )
}
