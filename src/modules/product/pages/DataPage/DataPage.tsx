import { FC, useMemo } from 'react'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { ProductEditState } from '../../ProductEditState'
import { SingleProductState } from '../../SingleProductState'

export declare namespace DataPage {
  export type Props = {
    editView: React.ReactElement
    readonlyView: React.ReactElement
    sideBySideView: React.ReactElement
    hasChanges: boolean
    title: string
    hideEditButton?: boolean
    isFutureVersion?: boolean
  }
}

const { TabWrapper, EditButton, FullWidthSection, SectionHeading } = ProductStyles

export const DataPageWithoutContext: FC<DataPage.Props> = ({
  title,
  editView,
  readonlyView,
  sideBySideView,
  hasChanges,
  isFutureVersion = false,
  hideEditButton = false,
}) => {
  const { translate } = Translation.useTranslation()

  const {
    action: { userRequestEdit },
    state,
  } = ProductEditState.useState()

  const { product } = SingleProductState.useActiveProduct()

  const isUnpublishedVariant = useMemo(() => {
    return !isFutureVersion && !product?.published
  }, [isFutureVersion, product])

  const editButton = (
    <EditButton
      onClick={userRequestEdit}
      isHidden={hideEditButton || isUnpublishedVariant}
      data-testid="edit-button"
    >
      {translate('product.editButton')}
    </EditButton>
  )

  switch (state.type) {
    case 'initial':
    case 'after-edit-failed':
    case 'after-edit-successful':
      return hasChanges ? (
        <TabWrapper>
          <FullWidthSection>
            <SectionHeading data-cy="section-heading">{title}</SectionHeading>
            {editButton}
            {sideBySideView}
          </FullWidthSection>
        </TabWrapper>
      ) : (
        <TabWrapper>
          <FullWidthSection>
            <SectionHeading data-cy="section-heading">{title}</SectionHeading>
            {editButton}
            {readonlyView}
          </FullWidthSection>
        </TabWrapper>
      )
    case 'during-edit':
    case 'during-edit-discarding':
    case 'during-edit-confirming':
    case 'during-api-submitting':
      return editView
  }
}

export const DataPage = (props: DataPage.Props) => (
  <ProductEditState.Provider>
    <DataPageWithoutContext {...props} />
  </ProductEditState.Provider>
)
