import { useParams } from 'react-router-dom'
import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { SavedDraftChangesConfirmationStyle } from '../SavedDraftChangesConfirmation/SavedDraftChangesConfirmation.style'
import { Routes } from '../../../routing/Routes'

export declare namespace VersionSavedDraftChangesConfirmation {
  export type Props = {
    numberOfChanges: number
  }
}

const { StyledLink, DescriptionLine } = SavedDraftChangesConfirmationStyle

export const VersionSavedDraftChangesConfirmation = ({
  numberOfChanges,
}: VersionSavedDraftChangesConfirmation.Props) => {
  const { translate } = Translation.useTranslation()

  const { masterSku, variantSku, version } = useParams() as Routes.ProductVariantVersionRouteParams

  return (
    <Notice
      title={translate('versionDraftChangesConfirmationNotice.title', {
        amount: numberOfChanges,
      })}
      variant="success"
      description={
        <div>
          <DescriptionLine>
            {translate('versionDraftChangesConfirmationNotice.description')}
          </DescriptionLine>
          <DescriptionLine>
            {translate('versionDraftChangesConfirmationNotice.linkDescription')}
          </DescriptionLine>
          <StyledLink
            to={Routes.resolveProductVariantVersionRoute(
              Routes.ProductVariantVersion.draftChanges,
              masterSku,
              variantSku,
              version,
              true,
            )}
          >
            {translate('versionDraftChangesConfirmationNotice.link')}
          </StyledLink>
        </div>
      }
    />
  )
}
