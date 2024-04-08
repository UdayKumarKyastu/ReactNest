import { useParams } from 'react-router-dom'
import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { SavedDraftChangesConfirmationStyle } from '../SavedDraftChangesConfirmation/SavedDraftChangesConfirmation.style'
import { Routes } from '../../../routing/Routes'

export declare namespace VersionDraftChangesExistNotice {
  export type Props = {
    numberOfChanges: number
  }
}

const { StyledLink, DescriptionLine } = SavedDraftChangesConfirmationStyle

export const VersionDraftChangesExistNotice = ({
  numberOfChanges,
}: VersionDraftChangesExistNotice.Props) => {
  const { translate } = Translation.useTranslation()

  const { masterSku, variantSku, version } = useParams() as Routes.ProductVariantVersionRouteParams

  return (
    <Notice
      title={translate('versionDraftChangesExistNotice.title', {
        amount: numberOfChanges,
      })}
      variant="warning"
      description={
        <div>
          <DescriptionLine>
            {translate('versionDraftChangesExistNotice.description')}
          </DescriptionLine>
          <DescriptionLine>
            {translate('versionDraftChangesExistNotice.linkDescription')}
          </DescriptionLine>
          <StyledLink
            to={Routes.resolveProductVariantVersionRoute(
              Routes.ProductVariantVersion.draftChanges,
              masterSku,
              variantSku,
              version,
              true,
            )}
            data-testid="draft-changes-link"
          >
            {translate('versionDraftChangesExistNotice.link')}
          </StyledLink>
        </div>
      }
    />
  )
}
