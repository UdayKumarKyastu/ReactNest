import React from 'react'
import { Notice } from '@pretamanger/component-library'
import { Translation } from '../../../i18n/Translation'
import { SavedDraftChangesConfirmationStyle } from './SavedDraftChangesConfirmation.style'
import { Routes } from '../../../routing/Routes'

export declare namespace SavedDraftChangesConfirmation {
  export type Props = {
    numberOfChanges: number
    sku: string
  }
}

const { StyledLink, DescriptionLine, ItalicParagraph } = SavedDraftChangesConfirmationStyle

export const SavedDraftChangesConfirmation = ({
  numberOfChanges,
  sku,
}: SavedDraftChangesConfirmation.Props) => {
  const { translate, translateWithHtml } = Translation.useTranslation()

  return (
    <Notice
      title={translate('draftChangesConfirmationNotice.title', {
        amount: numberOfChanges,
      })}
      variant="success"
      description={
        <div>
          <DescriptionLine>
            {translate('draftChangesConfirmationNotice.description')}
          </DescriptionLine>
          <DescriptionLine>
            {translateWithHtml('draftChangesConfirmationNotice.linkDescription', {
              allDraftChanges: (
                <ItalicParagraph>{`'${translate(
                  'draftChangesConfirmationNotice.allDraftChanges',
                )}'`}</ItalicParagraph>
              ),
            })}
          </DescriptionLine>
          <StyledLink to={Routes.resolveProductRoute(Routes.Product.allDraftChanges, sku, true)}>
            {translate('draftChangesConfirmationNotice.link')}
          </StyledLink>
        </div>
      }
    />
  )
}
