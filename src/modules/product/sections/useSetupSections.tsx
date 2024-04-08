import { isEqual } from 'lodash'
import { Translation } from '../../i18n/Translation'
import { ProductSetupPage } from '../pages/ProductSetupPage/ProductSetupPage'
import { ProductStyles } from '../pages/styles'
import Section from '../components/Section/Section'
import { useCallback, useMemo } from 'react'
import ReadonlyFieldWrapper from '../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import { ResourceSkus } from '../../../shared/model/resourceSkus'
import { SetupReviewStatus } from '../model/review-statuses/setup-review-status'
import CheckboxWithApprove from '../components/CheckboxWithApprove/CheckboxWithApprove'
import { useUserPermissions } from '../../auth/useUserPermissions'

const { StyledCheckbox, SubsectionHeading, ParagraphBold } = ProductStyles

export const useSetupSections = (
  formFields: ProductSetupPage.FormFields,
  translate: Translation.TranslationFunc,
  fieldsToCompare?: ProductSetupPage.FormFields | null,
  sectionWithChanges?: boolean,
  resourceSkus?: ResourceSkus,
  reviewStatuses?: SetupReviewStatus,
  reloadProduct?: () => void,
) => {
  const { canReviewSetUp } = useUserPermissions()
  const hasSectionChanged = useCallback(
    (keys: Array<keyof ProductSetupPage.FormFields>) => {
      return keys.some((key) => !isEqual(formFields[key], fieldsToCompare?.[key]))
    },
    [fieldsToCompare, formFields],
  )

  const hasEquipmentSectionChanged = useMemo(() => {
    return hasSectionChanged([
      'iceMachineRequired',
      'blenderRequired',
      'canHaveVariants',
      'canBeDecaf',
    ])
  }, [hasSectionChanged])

  const hasCanCustomAddFollowingSectionChanged = useMemo(() => {
    return hasSectionChanged(['canAddSyrup', 'canAddExtraCoffeeShot', 'canAddWhippedCream'])
  }, [hasSectionChanged])

  const sections = [
    <Section
      key="equipment"
      isHidden={sectionWithChanges && !hasEquipmentSectionChanged}
      data-cy="equipment-section"
    >
      <SubsectionHeading>{translate('productPage.equipment')}</SubsectionHeading>
      <CheckboxWithApprove
        isSelected={formFields.iceMachineRequired}
        fieldName="iceMachineRequired"
        label="productPage.fields.iceMachineRequired"
        reviewStatus={reviewStatuses?.iceMachineRequired}
        hasChanged={hasSectionChanged(['iceMachineRequired'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />

      <CheckboxWithApprove
        isSelected={formFields.blenderRequired}
        fieldName="blenderRequired"
        label="productPage.fields.blenderRequired"
        reviewStatus={reviewStatuses?.blenderRequired}
        hasChanged={hasSectionChanged(['blenderRequired'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />

      <CheckboxWithApprove
        isSelected={formFields.canHaveVariants}
        fieldName="canHaveVariants"
        label="productPage.fields.canHaveVariants"
        reviewStatus={reviewStatuses?.canHaveVariants}
        hasChanged={hasSectionChanged(['canHaveVariants'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />

      <CheckboxWithApprove
        isSelected={formFields.canBeDecaf}
        fieldName="canBeDecaf"
        label="productPage.fields.canBeDecaf"
        reviewStatus={reviewStatuses?.canBeDecaf}
        hasChanged={hasSectionChanged(['canBeDecaf'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />
    </Section>,
    <Section
      key="canCustomerAddFollowing"
      isHidden={sectionWithChanges && !hasCanCustomAddFollowingSectionChanged}
      data-cy="can-customer-add-following-section"
    >
      <SubsectionHeading>{translate('productPage.ingredientVariations')}</SubsectionHeading>
      <ParagraphBold>{`${translate('productPage.canCustomerAddFollowing')}:`}</ParagraphBold>

      <CheckboxWithApprove
        isSelected={formFields.canAddSyrup}
        fieldName="canAddSyrup"
        label="productPage.fields.syrup"
        reviewStatus={reviewStatuses?.canAddSyrup}
        hasChanged={hasSectionChanged(['canAddSyrup'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />

      <CheckboxWithApprove
        isSelected={formFields.canAddExtraCoffeeShot}
        fieldName="canAddExtraShot"
        id="canAddExtraCoffeeShot"
        label="productPage.fields.extraCoffeeShot"
        reviewStatus={reviewStatuses?.canAddExtraShot}
        hasChanged={hasSectionChanged(['canAddExtraCoffeeShot'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />

      <CheckboxWithApprove
        isSelected={formFields.canAddWhippedCream}
        fieldName="canAddWhippedCream"
        label="productPage.fields.whippedCream"
        reviewStatus={reviewStatuses?.canAddWhippedCream}
        hasChanged={hasSectionChanged(['canAddWhippedCream'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        tabName="set-up"
        canApproveChanges={canReviewSetUp}
      />
    </Section>,
    <Section isHidden={sectionWithChanges} key="canDrinkBeMade" data-cy="can-drink-be-made-section">
      <ParagraphBold>{`${translate('productPage.canDrinkBeMade')}:`}</ParagraphBold>
      <ReadonlyFieldWrapper>
        <StyledCheckbox
          id="canBeWithoutMilk"
          label={translate('productPage.fields.withoutMilk')}
          name="canBeWithoutMilk"
          isSelected={formFields.canBeWithoutMilk}
          defaultChecked={formFields.canBeWithoutMilk}
          disabled
        />
        <StyledCheckbox
          id="canBeWithSemiSkimmedMilk"
          label={translate('productPage.fields.withSemiSkimmedMilk')}
          name="canBeWithSemiSkimmedMilk"
          isSelected={formFields.canBeWithSemiSkimmedMilk}
          defaultChecked={formFields.canBeWithSemiSkimmedMilk}
          disabled
        />
        <StyledCheckbox
          id="canBeWithSkimmedMilk"
          label={translate('productPage.fields.withSkimmedMilk')}
          name="canBeWithSkimmedMilk"
          isSelected={formFields.canBeWithSkimmedMilk}
          defaultChecked={formFields.canBeWithSkimmedMilk}
          disabled
        />
        <StyledCheckbox
          id="canBeWithOatMilk"
          label={translate('productPage.fields.withOatMilk')}
          name="canBeWithOatMilk"
          isSelected={formFields.canBeWithOatMilk}
          defaultChecked={formFields.canBeWithOatMilk}
          disabled
        />
        <StyledCheckbox
          id="canBeWithRiceCoconutMilk"
          label={translate('productPage.fields.withRiceCoconutMilk')}
          name="canBeWithRiceCoconutMilk"
          isSelected={formFields.canBeWithRiceCoconutMilk}
          defaultChecked={formFields.canBeWithRiceCoconutMilk}
          disabled
        />
        <StyledCheckbox
          id="canBeWithSoyMilk"
          label={translate('productPage.fields.withSoyMilk')}
          name="canBeWithSoyMilk"
          isSelected={formFields.canBeWithSoyMilk}
          defaultChecked={formFields.canBeWithSoyMilk}
          disabled
        />
      </ReadonlyFieldWrapper>
    </Section>,
  ]

  return {
    sections,
  }
}
