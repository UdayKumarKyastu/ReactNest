import { isEqual } from 'lodash'
import { Translation } from '../../i18n/Translation'
import { BaristaVariantAttributes } from '../model/barista-attributes'
import { ProductStyles } from '../../product/pages/styles'
import React, { useCallback } from 'react'
import Section from '../components/Section/Section'
import ReadonlyFieldWrapper from '../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { ResourceSkus } from '../../../shared/model/resourceSkus'
import { AttributesReviewStatus } from '../model/review-statuses/attributes-review-status'
import CheckboxWithApprove from '../components/CheckboxWithApprove/CheckboxWithApprove'
import { useUserPermissions } from '../../auth/useUserPermissions'

const { SubsectionHeading } = ProductStyles

const attributesKeys: Array<keyof BaristaVariantAttributes> = [
  'withDecafPods',
  'withoutMilk',
  'withSemiSkimmedMilk',
  'withSkimmedMilk',
  'withOatMilk',
  'withRiceCoconutMilk',
  'withSoyMilk',
]

export const useAttributesSections = (
  formFields: BaristaVariantAttributes,
  translate: Translation.TranslationFunc,
  fieldsToCompare: BaristaVariantAttributes,
  sectionWithChanges?: boolean,
  resourceSkus?: ResourceSkus,
  reviewStatuses?: AttributesReviewStatus,
  isDraftView?: boolean,
  reloadProduct?: () => void,
) => {
  const hasFieldChanged = useCallback(
    (key: keyof BaristaVariantAttributes) => {
      return !isEqual(formFields[key], fieldsToCompare[key])
    },
    [fieldsToCompare, formFields],
  )
  const { canReviewBaristaAttribute } = useUserPermissions()

  const sections = [
    <Section key="variantAttributes">
      <SubsectionHeading>
        {`${translate('productVariantAttributes.drinkIsMade')}:`}
      </SubsectionHeading>
      <ReadonlyFieldWrapper>
        {attributesKeys.map((key) => (
          <CheckboxWithApprove
            key={key}
            fieldName={key}
            label={`productVariantAttributes.${key}`}
            isSelected={formFields[key]}
            reviewStatus={reviewStatuses?.[key]}
            resourceSkus={resourceSkus}
            sectionWithChanges={sectionWithChanges}
            isNotDisplayed={isDraftView && !hasFieldChanged(key)}
            hasChanged={hasFieldChanged(key)}
            reloadProduct={reloadProduct}
            tabName="attributes"
            canApproveChanges={canReviewBaristaAttribute}
          />
        ))}
      </ReadonlyFieldWrapper>
    </Section>,
  ]

  return { sections }
}
