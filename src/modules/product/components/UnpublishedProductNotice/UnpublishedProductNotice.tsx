import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'

interface Props {
  productName: string
  versionNumber?: Number
}

export const UnpublishedProductNotice = ({ productName, versionNumber }: Props) => {
  const { translate } = Translation.useTranslation()

  return (
    <Notice
      title={translate('product.unpublishedProductNoticeTitle')}
      variant="info"
      description={`${productName}${
        versionNumber ? `, ${translate('productPage.version')} ${versionNumber}` : ''
      } ${translate('product.unpublishedProductNoticeDescription')}`}
    />
  )
}
