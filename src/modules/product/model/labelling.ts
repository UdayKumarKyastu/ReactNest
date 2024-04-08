export type Labelling = {
  legalTitle: string | null
  storageConditions: string | null
  includeAverageWeightOnLabel: boolean
  includeNutritionalInformationOnLabel: boolean
  countryOfOriginDescription: string | null
  ean13Code: string | null
  useBy: string | null
  sellBy: string | null
  productServes: string | null
  canBeCookedInTurboChef: boolean
  useByTurboChef: string | null
  sellByTurboChef: string | null
  howToCard: {
    fileName: string
    /**
     * Base64 data:image/png
     */
    qrPng: string
    /**
     * SVG xml
     */
    qrSvg: string
  }
}
