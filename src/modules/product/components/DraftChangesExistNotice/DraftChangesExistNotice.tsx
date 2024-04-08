import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { SavedDraftChangesConfirmationStyle } from '../SavedDraftChangesConfirmation/SavedDraftChangesConfirmation.style'
import { Routes } from '../../../routing/Routes'

export declare namespace SavedDraftChangesConfirmation {
  export type Props = {
    numberOfChanges: number
    sku: string
  }
}

const { StyledLink, DescriptionLine, ItalicParagraph } = SavedDraftChangesConfirmationStyle

export const DraftChangesExistNotice = ({
  numberOfChanges,
  sku,
}: SavedDraftChangesConfirmation.Props) => {
  const { translate, translateWithHtml } = Translation.useTranslation()

  return (
    <Notice
      title={translate('draftChangesExistNotice.title', {
        amount: numberOfChanges,
      })}
      variant="warning"
      description={
        <div>
          <DescriptionLine>{translate('draftChangesExistNotice.description')}</DescriptionLine>
          <DescriptionLine>
            {translateWithHtml('draftChangesExistNotice.linkDescription', {
              allDraftChanges: (
                <ItalicParagraph>{`'${translate(
                  'draftChangesExistNotice.allDraftChanges',
                )}'`}</ItalicParagraph>
              ),
            })}
          </DescriptionLine>
          {sku && (
            <StyledLink
              to={Routes.resolveProductRoute(Routes.Product.allDraftChanges, sku, true)}
              data-testid="all-draft-changes-link"
            >
              {translate('draftChangesExistNotice.link')}
            </StyledLink>
          )}
        </div>
      }
    />
  )
}
