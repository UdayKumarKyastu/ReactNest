import React, { useCallback, useContext, useMemo } from 'react'
import { isEqual } from 'lodash'
import { Translation } from '../../i18n/Translation'
import { ProductStyles } from '../../product/pages/styles'
import { ProductVariantMarketingPage } from '../pages/ProductVariantMarketingPage/ProductVariantMarketingPage'
import { Locale } from '../../i18n/Locale'
import { BulletList } from '../../common/components/BulletList/BulletList'
import { HowToDisplayOptionsContext } from '../HowToDisplayOptionsContext'
import { MultiLangText } from '../../common/components/MultiLangText/MultiLangText'
import { CountryCode } from '../../../shared/model/country-code'
import ReadonlyFieldWrapper from '../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'
import Section from '../components/Section/Section'
import { ResourceSkus } from '../../../shared/model/resourceSkus'
import { MarketingReviewStatus } from '../model/review-statuses/marketing-review-status'
import CheckboxWithApprove from '../components/CheckboxWithApprove/CheckboxWithApprove'
import MultiLangChanges from '../components/MultiLangChanges/MultiLangChanges'
import { useUserPermissions } from '../../auth/useUserPermissions'

const { SubsectionHeading } = ProductStyles

interface HookArguments {
  formFields: ProductVariantMarketingPage.FormFields
  countryCode: CountryCode
  fieldsToCompare: ProductVariantMarketingPage.FormFields
  isSideBySide?: boolean
  sectionWithChanges?: boolean
  resourceSkus?: ResourceSkus
  reviewStatuses?: MarketingReviewStatus
  isDraftView?: boolean
  reloadProduct?: () => void
}

export const useVariantMarketingSections = ({
  formFields,
  fieldsToCompare,
  countryCode,
  isSideBySide,
  sectionWithChanges,
  resourceSkus,
  reviewStatuses,
  isDraftView,
  reloadProduct,
}: HookArguments) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()
  const { canReviewMarketing } = useUserPermissions()

  const {
    variantName,
    variantDescription,
    liveFrom,
    liveTo,
    visible,
    availableForCollection,
    availableForOutposts,
    availableForPretDelivers,
    isChefSpecial,
    displayAsNewUntil,
    isDisplayed,
    howToDisplay,
    visibleOnDeliveryWebsite,
    availableForLunch,
    availableAllDay,
  } = formFields

  const hasSectionChanged = useCallback(
    (keys: Array<keyof ProductVariantMarketingPage.FormFields>) => {
      return keys.some((key) => {
        return !isEqual(formFields[key], fieldsToCompare[key])
      })
    },
    [fieldsToCompare, formFields],
  )

  const showSection = useCallback(
    (keys: Array<keyof ProductVariantMarketingPage.FormFields>) => {
      return sectionWithChanges ? hasSectionChanged(keys) : true
    },
    [hasSectionChanged, sectionWithChanges],
  )

  const showArrow = useCallback(
    (keys: Array<keyof ProductVariantMarketingPage.FormFields>) => {
      return sectionWithChanges && hasSectionChanged(keys)
    },
    [hasSectionChanged, sectionWithChanges],
  )

  const hasAvailabilitySectionChanged = useMemo(() => {
    return hasSectionChanged([
      'availableForCollection',
      'availableForPretDelivers',
      'availableForOutposts',
    ])
  }, [hasSectionChanged])

  const hasVisibilitySectionChanged = useMemo(() => {
    return hasSectionChanged(['visible', 'visibleOnDeliveryWebsite'])
  }, [hasSectionChanged])

  const howToDisplayOptions = useContext(HowToDisplayOptionsContext.Context)

  const sections = [
    <Section
      data-cy="variant-marketing-name-section"
      isHidden={!showSection(['variantName'])}
      key="productNames"
    >
      <SubsectionHeading>
        {translate('productVariantMarketing.productDescriptions')}
      </SubsectionHeading>
      {!reviewStatuses ? (
        <ReadonlyFieldWrapper
          testSelector="variantName"
          noMargin
          label={translate('productPage.fields.variantMarketingName')}
          presentChange={hasSectionChanged(['variantName'])}
          showArrow={showArrow(['variantName'])}
          isHidden={sectionWithChanges && !hasSectionChanged(['variantName'])}
          resourceSkus={resourceSkus}
        >
          <MultiLangText
            value={variantName}
            defaultLocale={Locale.DefaultLocaleByCountryCode[countryCode]}
            draftValue={fieldsToCompare?.variantName}
            locales={Locale.LocalesListByCountryCode[countryCode]}
            isExpanded={isSideBySide}
          />
        </ReadonlyFieldWrapper>
      ) : (
        <MultiLangChanges
          reviewStatuses={reviewStatuses.name}
          resourceSkus={resourceSkus}
          value={variantName}
          fieldName="name"
          hideButtons={!sectionWithChanges}
          showArrow={sectionWithChanges}
          reloadProduct={reloadProduct}
          canApproveChanges={canReviewMarketing}
        />
      )}
    </Section>,
    <Section
      data-cy="variant-marketing-description-section"
      isHidden={!showSection(['variantDescription'])}
      key="productDescriptions"
    >
      {!reviewStatuses ? (
        <ReadonlyFieldWrapper
          testSelector="variantDescription"
          noMargin
          label={translate('productPage.fields.variantMarketingDescription')}
          presentChange={hasSectionChanged(['variantDescription'])}
          showArrow={showArrow(['variantDescription'])}
          isHidden={sectionWithChanges && !hasSectionChanged(['variantDescription'])}
          canApproveChanges={canReviewMarketing}
        >
          <MultiLangText
            value={variantDescription}
            defaultLocale={Locale.DefaultLocaleByCountryCode[countryCode]}
            draftValue={fieldsToCompare?.variantDescription}
            locales={Locale.LocalesListByCountryCode[countryCode]}
            isExpanded={isSideBySide}
          />
        </ReadonlyFieldWrapper>
      ) : (
        <MultiLangChanges
          reviewStatuses={reviewStatuses.description}
          resourceSkus={resourceSkus}
          value={variantDescription}
          fieldName="description"
          hideButtons={!sectionWithChanges}
          showArrow={sectionWithChanges}
          reloadProduct={reloadProduct}
          canApproveChanges={canReviewMarketing}
        />
      )}
    </Section>,
    <Section
      isHidden={sectionWithChanges && !hasAvailabilitySectionChanged}
      key="isProductAvailableFor"
      data-cy="is-product-available-for-section"
    >
      <SubsectionHeading>
        {translate('productVariantMarketing.isProductAvailableFor')}
      </SubsectionHeading>
      <CheckboxWithApprove
        isSelected={!!availableForCollection}
        fieldName="availableForClickAndCollect"
        label="productVariantMarketing.clickAndCollect"
        reviewStatus={reviewStatuses?.availableForClickAndCollect}
        hasChanged={hasSectionChanged(['availableForCollection'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        isNotDisplayed={isDraftView && !hasSectionChanged(['availableForCollection'])}
        reloadProduct={reloadProduct}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />
      <CheckboxWithApprove
        isSelected={!!availableForPretDelivers}
        fieldName="availableForPretDelivers"
        label="productVariantMarketing.pretDelivers"
        reviewStatus={reviewStatuses?.availableForPretDelivers}
        hasChanged={hasSectionChanged(['availableForPretDelivers'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['availableForPretDelivers'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />
      <CheckboxWithApprove
        isSelected={!!availableForOutposts}
        fieldName="availableForOutposts"
        label="productVariantMarketing.outposts"
        reviewStatus={reviewStatuses?.availableForOutposts}
        hasChanged={hasSectionChanged(['availableForOutposts'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['availableForOutposts'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />
    </Section>,
    <Section
      isHidden={sectionWithChanges && !hasVisibilitySectionChanged}
      key="customerVisibility"
      data-cy="customer-visibility-section"
    >
      <SubsectionHeading>
        {translate('productVariantMarketing.customerVisibility')}
      </SubsectionHeading>
      <CheckboxWithApprove
        isSelected={!!visible}
        fieldName="isLive"
        label="productVariantMarketing.visibleOnBrandWebsite"
        reviewStatus={reviewStatuses?.isLive}
        hasChanged={hasSectionChanged(['visible'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['visible'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />

      <CheckboxWithApprove
        isSelected={!!visibleOnDeliveryWebsite}
        fieldName="visibleOnDeliveryWebsite"
        label="productVariantMarketing.visibleOnPretDeliversWebsite"
        reviewStatus={reviewStatuses?.visibleOnDeliveryWebsite}
        hasChanged={hasSectionChanged(['visibleOnDeliveryWebsite'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['visibleOnDeliveryWebsite'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />
    </Section>,
    <Section
      isHidden={!showSection(['liveFrom', 'liveTo'])}
      key="websiteReleaseDates"
      data-cy="website-release-dates-section"
    >
      <SubsectionHeading>
        {translate('productVariantMarketing.websiteReleaseDates')}
      </SubsectionHeading>
      <ReadonlyFieldWrapper
        showArrow={showArrow(['liveFrom'])}
        testSelector="read-make-product-visible-on"
        label={translate('productVariantMarketing.liveFrom')}
        isHidden={sectionWithChanges && !hasSectionChanged(['liveFrom'])}
        hideButtons={reviewStatuses?.liveFrom && !sectionWithChanges}
        reviewStatus={reviewStatuses?.liveFrom}
        fieldName="liveFrom"
        reloadProduct={reloadProduct}
        resourceSkus={resourceSkus}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      >
        {liveFrom ? new Intl.DateTimeFormat(locale).format(new Date(liveFrom!)) : ''}
      </ReadonlyFieldWrapper>

      <ReadonlyFieldWrapper
        showArrow={showArrow(['liveTo'])}
        testSelector="read-delist-product-on"
        label={translate('productVariantMarketing.liveTo')}
        isHidden={sectionWithChanges && !hasSectionChanged(['liveTo'])}
        hideButtons={reviewStatuses?.liveTo && !sectionWithChanges}
        reviewStatus={reviewStatuses?.liveTo}
        fieldName="liveTo"
        reloadProduct={reloadProduct}
        resourceSkus={resourceSkus}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      >
        {liveTo ? new Intl.DateTimeFormat(locale).format(new Date(liveTo!)) : ''}
      </ReadonlyFieldWrapper>
    </Section>,
    <Section
      isHidden={!showSection(['isChefSpecial', 'displayAsNewUntil'])}
      key="productDisplay"
      data-cy="product-display-section"
    >
      <SubsectionHeading>{translate('productVariantMarketing.productDisplay')}</SubsectionHeading>
      <CheckboxWithApprove
        isSelected={!!isChefSpecial}
        fieldName="isChefsSpecial"
        label="productVariantMarketing.displayAsAChefsSpecial"
        reviewStatus={reviewStatuses?.isChefsSpecial}
        hasChanged={hasSectionChanged(['isChefSpecial'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['isChefSpecial'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />

      <CheckboxWithApprove
        isSelected={isDisplayed}
        fieldName="isDisplayed"
        label="productVariantMarketing.displayAsANewProduct"
        reviewStatus={reviewStatuses?.isDisplayed}
        hasChanged={hasSectionChanged(['isDisplayed'])}
        sectionWithChanges={sectionWithChanges}
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['isDisplayed'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      />

      <ReadonlyFieldWrapper
        isHidden={!showSection(['displayAsNewUntil'])}
        label={translate('productVariantMarketing.displaysNewTill')}
        showArrow={showArrow(['displayAsNewUntil'])}
        testSelector="read-date-display-product-as-new"
        presentChange={hasSectionChanged(['displayAsNewUntil'])}
        hideButtons={reviewStatuses?.displayAsNewUntil && !sectionWithChanges}
        reviewStatus={reviewStatuses?.displayAsNewUntil}
        fieldName="displayAsNewUntil"
        resourceSkus={resourceSkus}
        reloadProduct={reloadProduct}
        isNotDisplayed={isDraftView && !hasSectionChanged(['displayAsNewUntil'])}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      >
        {displayAsNewUntil
          ? new Intl.DateTimeFormat(locale).format(new Date(displayAsNewUntil!))
          : ''}
      </ReadonlyFieldWrapper>
    </Section>,
    <Section
      isHidden={!showSection(['availableAllDay', 'availableForLunch'])}
      key="pretDelivers"
      data-cy="pret-delivers-section"
    >
      <SubsectionHeading>{translate('productVariantMarketing.pretDelivers')}</SubsectionHeading>
      <ReadonlyFieldWrapper>
        <CheckboxWithApprove
          isSelected={availableAllDay}
          fieldName="availableAllDay"
          label="productVariantMarketing.availableAllDay"
          reviewStatus={reviewStatuses?.availableAllDay}
          hasChanged={hasSectionChanged(['availableAllDay'])}
          sectionWithChanges={sectionWithChanges}
          resourceSkus={resourceSkus}
          reloadProduct={reloadProduct}
          isNotDisplayed={isDraftView && !hasSectionChanged(['availableAllDay'])}
          tabName="marketing"
          canApproveChanges={canReviewMarketing}
        />

        <CheckboxWithApprove
          isSelected={availableForLunch}
          fieldName="availableForLunch"
          label="productVariantMarketing.availableForLunch"
          reviewStatus={reviewStatuses?.availableForLunch}
          hasChanged={hasSectionChanged(['availableForLunch'])}
          sectionWithChanges={sectionWithChanges}
          resourceSkus={resourceSkus}
          reloadProduct={reloadProduct}
          isNotDisplayed={isDraftView && !hasSectionChanged(['availableForLunch'])}
          tabName="marketing"
          canApproveChanges={canReviewMarketing}
        />
      </ReadonlyFieldWrapper>
    </Section>,
    <Section isHidden={!showSection(['howToDisplay'])} key="inStore" data-cy="in-store-section">
      <SubsectionHeading>{translate('productVariantMarketing.inStore')}</SubsectionHeading>
      <ReadonlyFieldWrapper
        label={translate('productVariantMarketing.howToDisplay')}
        presentChange={hasSectionChanged(['howToDisplay'])}
        showArrow={showArrow(['howToDisplay'])}
        hideButtons={reviewStatuses?.howToDisplay && !sectionWithChanges}
        reviewStatus={reviewStatuses?.howToDisplay}
        fieldName="howToDisplay"
        reloadProduct={reloadProduct}
        resourceSkus={resourceSkus}
        tabName="marketing"
        canApproveChanges={canReviewMarketing}
      >
        <BulletList
          items={howToDisplayOptions
            .filter((option) => howToDisplay.includes(option.key))
            .map((option) => option.label)}
        />
      </ReadonlyFieldWrapper>
    </Section>,
  ]

  return {
    sections,
  }
}
