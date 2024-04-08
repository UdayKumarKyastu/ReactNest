import React from 'react'
import { ProductStyles } from '../../../../modules/product/pages/styles'
import { RadioButton } from '@pretamanger/component-library'
import { Translation } from '../../../../modules/i18n/Translation'
import { LabellingOptions } from 'src/modules/product/model/product'
import { Labelling } from 'src/modules/product/model/labelling'
import ReadonlyFieldWrapper from '../../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { LabellingKeys } from 'src/modules/product/sections/useLabellingSections/useLabellingSections'
import { ResourceSkus } from '../../../../shared/model/resourceSkus'
import { LabellingReviewStatus } from 'src/modules/product/model/review-statuses/labelling-review-status'
import { useUserPermissions } from '../../../auth/useUserPermissions'

const { FullWidthSection, RadioButtonWrapper } = ProductStyles

interface Props {
  showSection: (keys: LabellingKeys) => boolean
  displaySection: (keys: LabellingKeys) => boolean
  hasSectionChanged: (keys: LabellingKeys) => boolean
  showArrow: (keys: LabellingKeys) => boolean
  formFields: Labelling
  labellingOptions?: LabellingOptions
  sectionWithChanges?: boolean
  resourceSkus?: ResourceSkus
  reviewStatuses?: LabellingReviewStatus
  reloadProduct?: () => void
}

const TurboChefSection = ({
  showSection,
  showArrow,
  formFields,
  labellingOptions,
  hasSectionChanged,
  sectionWithChanges,
  displaySection,
  reviewStatuses,
  resourceSkus,
  reloadProduct,
}: Props) => {
  const { translate } = Translation.useTranslation()
  const { canReviewLabelling } = useUserPermissions()

  return (
    <FullWidthSection>
      <ReadonlyFieldWrapper
        isHidden={!showSection(['canBeCookedInTurboChef'])}
        isNotDisplayed={!displaySection(['canBeCookedInTurboChef'])}
        label={translate('productVariantLabelling.canBeCookedInTurboChef')}
        presentChange={hasSectionChanged(['canBeCookedInTurboChef'])}
        showArrow={showArrow(['canBeCookedInTurboChef'])}
        fieldName="canBeCookedInTurboChef"
        hideButtons={reviewStatuses?.canBeCookedInTurboChef && !sectionWithChanges}
        reviewStatus={reviewStatuses?.canBeCookedInTurboChef}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        <RadioButtonWrapper data-cy="canBeCookedInTurboChefYes">
          <RadioButton
            id="canBeCookedInTurboChef"
            name={
              sectionWithChanges ? 'canBeCookedInTurboChefYesDraft' : 'canBeCookedInTurboChefYes'
            }
            label="Yes"
            defaultChecked={formFields.canBeCookedInTurboChef!}
            onChange={() => {}}
            disabled
          />
        </RadioButtonWrapper>

        <RadioButtonWrapper data-cy="canBeCookedInTurboChefNo">
          <RadioButton
            id="canBeCookedInTurboChef"
            name={sectionWithChanges ? 'canBeCookedInTurboChefNoDraft' : 'canBeCookedInTurboChefNo'}
            label="No"
            defaultChecked={!formFields.canBeCookedInTurboChef!}
            onChange={() => {}}
            disabled
          />
        </RadioButtonWrapper>
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['useByTurboChef'])}
        isNotDisplayed={!displaySection(['useByTurboChef'])}
        testSelector="useByTurboChef"
        showArrow={showArrow(['useByTurboChef'])}
        presentChange={hasSectionChanged(['useByTurboChef'])}
        label={translate('productVariantLabelling.useByTurboChef')}
        fieldName="useByTurboChef"
        hideButtons={reviewStatuses?.useByTurboChef && !sectionWithChanges}
        reviewStatus={reviewStatuses?.useByTurboChef}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        {labellingOptions?.useBy.find((option) => formFields.useByTurboChef === option.key)?.label}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        isHidden={!showSection(['sellByTurboChef'])}
        isNotDisplayed={!displaySection(['sellByTurboChef'])}
        label={translate('productVariantLabelling.sellByTurboChef')}
        testSelector="sellByTurboChef"
        showArrow={showArrow(['sellByTurboChef'])}
        presentChange={hasSectionChanged(['sellByTurboChef'])}
        fieldName="sellByTurboChef"
        hideButtons={reviewStatuses?.sellByTurboChef && !sectionWithChanges}
        reviewStatus={reviewStatuses?.sellByTurboChef}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="labelling"
        canApproveChanges={canReviewLabelling}
      >
        {
          labellingOptions?.sellBy.find((option) => formFields.sellByTurboChef === option.key)
            ?.label
        }
      </ReadonlyFieldWrapper>
    </FullWidthSection>
  )
}

export default TurboChefSection
