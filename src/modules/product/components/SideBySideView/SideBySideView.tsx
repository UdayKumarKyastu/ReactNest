import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductStyles } from '../../pages/styles'
import { DraftChangesExistNotice } from '../../components/DraftChangesExistNotice/DraftChangesExistNotice'
import { VersionDraftChangesExistNotice } from '../../components/VersionDraftChangesExistNotice/VersionDraftChangesExistNotice'
import {
  SideBySideTable,
  SideBySideTableColumn,
  SideBySideTableRow,
  TableSectionHeadline,
} from '../../../common/components/SideBySideTable/SideBySideTable'
import { SavedDraftChangesConfirmation } from '../../components/SavedDraftChangesConfirmation/SavedDraftChangesConfirmation'
import { VersionSavedDraftChangesConfirmation } from '../../components/VersionSavedDraftChangesConfirmation/VersionSavedDraftChangesConfirmation'
import { Translation } from '../../../i18n/Translation'
import { Routes } from '../../../routing/Routes'

export declare namespace SideBySideView {
  export type Props = {
    sections: React.ReactElement[]
    draftSections: React.ReactElement[]
    numberOfChanges?: number
    isFromEdit?: boolean
    sku?: string
    isAllDraftChangesView?: boolean
    redirectionRoute?: React.ReactNode
    versionNotice?: React.ReactElement
  }
}

const { FullWidthSection } = ProductStyles

export const SideBySideView = ({
  sections,
  draftSections,
  isFromEdit,
  redirectionRoute,
  sku,
  numberOfChanges = 0,
  isAllDraftChangesView = false,
}: SideBySideView.Props) => {
  const { translate } = Translation.useTranslation()

  const { version } = useParams<Routes.ProductVariantVersionRouteParams>()

  return (
    <FullWidthSection>
      {(numberOfChanges > 0 || isAllDraftChangesView) && (
        <FullWidthSection>
          {!isAllDraftChangesView &&
            (isFromEdit ? (
              version ? (
                <VersionSavedDraftChangesConfirmation numberOfChanges={numberOfChanges} />
              ) : (
                <SavedDraftChangesConfirmation numberOfChanges={numberOfChanges} sku={sku!} />
              )
            ) : version ? (
              <VersionDraftChangesExistNotice numberOfChanges={numberOfChanges} />
            ) : (
              <DraftChangesExistNotice numberOfChanges={numberOfChanges} sku={sku!} />
            ))}
          <SideBySideTable>
            <SideBySideTableRow>
              <SideBySideTableColumn>
                <TableSectionHeadline marginTop={false}>
                  {translate('productGroupMarketingPage.currentColumnHeadline')}
                </TableSectionHeadline>
              </SideBySideTableColumn>
              <SideBySideTableColumn>
                <TableSectionHeadline marginTop={false}>
                  {translate('productGroupMarketingPage.draftColumnHeadline')}
                </TableSectionHeadline>
                {redirectionRoute}
              </SideBySideTableColumn>
            </SideBySideTableRow>
            {sections.map((section, index) => {
              if (isAllDraftChangesView && draftSections[index]?.props.isHidden) {
                return null
              }

              const isLastItem = sections.length === index + 1

              return (
                <SideBySideTableRow key={index}>
                  <SideBySideTableColumn noBorder={isLastItem}>{section}</SideBySideTableColumn>
                  <SideBySideTableColumn noBorder>{draftSections[index]}</SideBySideTableColumn>
                </SideBySideTableRow>
              )
            })}
          </SideBySideTable>
        </FullWidthSection>
      )}
    </FullWidthSection>
  )
}
