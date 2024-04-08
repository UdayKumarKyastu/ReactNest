import { useMemo } from 'react'
import { ProductStyles } from '../styles'
import { Translation } from '../../../i18n/Translation'
import { ProductVariant } from '../../model/product-variant'
import { Locale } from '../../../i18n/Locale'
import { BulletList } from '../../../common/components/BulletList/BulletList'
import { HgIngredients } from '../../components/HgIngredients/HgIngredients'
import ReadonlyFieldWrapper from '../../components/ReadonlyFieldWrapper/ReadonlyFieldWrapper'

export declare namespace ProductVariantNutritionalsPage {
  export type Props = {
    nutrition: ProductVariant['hamiltonGrant']['nutrition']
    isVegan: boolean
    isVegetarian: boolean
    size: string | number
    ingredients: Locale.MultilangString
    allergens: ProductVariant['hamiltonGrant']['allergens']
  }
}

const {
  TabWrapper,
  SectionHeading,
  SubsectionHeading,
  FullWidthSection,
  StyledTable,
  SectionDivider,
  Section,
  StyledCheckbox,
  FieldLabel,
} = ProductStyles

export const ProductVariantNutritionalsPage = ({
  nutrition,
  isVegan,
  isVegetarian,
  size,
  ingredients,
  allergens,
}: ProductVariantNutritionalsPage.Props) => {
  const { locale } = Locale.useLocale()
  const { translate } = Translation.useTranslation()
  const headings = useMemo(
    () => [
      translate('productVariantNutritionals.item'),
      translate('productVariantNutritionals.localisedLabel'),
      translate('productVariantNutritionals.per100g'),
      translate('productVariantNutritionals.perServing'),
    ],
    [translate],
  )

  const rows: string[][] = useMemo(
    () =>
      nutrition.map((element) => {
        return [
          element.name,
          element.localisedLabel[locale],
          element.per100g,
          element.perServing,
        ].map((item) => `${item}` || '')
      }),
    [nutrition, locale],
  )

  return (
    <TabWrapper>
      <FullWidthSection>
        <SectionHeading data-cy="section-heading">
          {translate('productVariantNutritionals.variantNutritionals')}
        </SectionHeading>
        <SubsectionHeading>
          {translate('productVariantNutritionals.productDetails')}
        </SubsectionHeading>
        <FieldLabel>{translate('productVariantNutritionals.ingredients')}</FieldLabel>
        <HgIngredients ingredients={ingredients} />
        <ReadonlyFieldWrapper label={translate('productVariantNutritionals.averageProductWeight')}>
          {size.toString()}
        </ReadonlyFieldWrapper>
      </FullWidthSection>

      <SectionDivider />

      <FullWidthSection>
        <SubsectionHeading>
          {translate('productVariantNutritionals.nutritionalInformation')}
        </SubsectionHeading>
        <StyledTable headings={headings} rows={rows} />
      </FullWidthSection>

      <SectionDivider />

      <Section>
        <SubsectionHeading>{translate('productVariantNutritionals.suitableFor')}</SubsectionHeading>
        <StyledCheckbox
          id="isVegan"
          label={translate('productVariantNutritionals.vegan')}
          name="isVegan"
          isSelected={isVegan}
          defaultChecked={isVegan}
          disabled
        />
        <StyledCheckbox
          id="isVegetarian"
          label={translate('productVariantNutritionals.vegetarian')}
          name="isVegetarian"
          isSelected={isVegetarian}
          defaultChecked={isVegetarian}
          disabled
        />
      </Section>

      <SectionDivider />

      <Section>
        <SubsectionHeading>{translate('productVariantNutritionals.allergens')}</SubsectionHeading>
        <ReadonlyFieldWrapper
          testSelector="allergens-field"
          label={translate('productVariantNutritionals.localisedAllergens')}
        >
          {allergens.length > 0 ? (
            <BulletList
              items={allergens.map((allergen) => allergen.label[locale] ?? allergen.name)}
            />
          ) : (
            '-'
          )}
        </ReadonlyFieldWrapper>
      </Section>
    </TabWrapper>
  )
}
