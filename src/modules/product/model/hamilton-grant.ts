import { Locale } from '../../i18n/Locale'
import { RecipeStatus } from '../../../shared/model/recipe-status'
import DOMPurify from 'dompurify'

const sanitizeHtml = (html: string) => DOMPurify.sanitize(html)

export declare namespace HamiltonGrant {
  export type ProductCode = string

  export interface Cuisine {
    isVegan: boolean
    isVegetarian: boolean
  }

  export interface NutritionItem {
    name: string
    localisedLabel: Locale.MultilangString
    per100g: number | null
    perServing: number | null
  }
}

export class HamiltonGrant {
  cuisine: HamiltonGrant.Cuisine
  productCode: HamiltonGrant.ProductCode | null
  lastSyncedAt: string | null
  nutrition: HamiltonGrant.NutritionItem[]
  allergens: Array<{
    name: string
    label: Locale.MultilangString
  }>
  ingredients: Locale.MultilangString
  constituentHGCodes: string[]
  hgRecipeStatus: RecipeStatus | null
  recipeTypes: string[] | null

  constructor(
    params: HamiltonGrant & {
      lastSyncedAt: string | null
    },
  ) {
    this.cuisine = params.cuisine
    this.productCode = params.productCode
    this.lastSyncedAt = params.lastSyncedAt ? new Date(params.lastSyncedAt).toISOString() : null
    this.nutrition = params.nutrition
    this.allergens = params.allergens
    this.constituentHGCodes = params.constituentHGCodes
    this.hgRecipeStatus = params.hgRecipeStatus
    this.recipeTypes = params.recipeTypes
    this.ingredients = Object.entries(params.ingredients).reduce(
      (newMultiLangString, [lang, value]) => {
        const typedLang = lang as Locale.Lang

        newMultiLangString[typedLang] = sanitizeHtml(value)

        return newMultiLangString
      },
      {} as Locale.MultilangString,
    )
  }
}
