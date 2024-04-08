export enum CountryFilters {
  UK = 'UK',
  US = 'US',
  FR = 'FR',
  HK = 'HK',
}

export enum SearchQueryParameters {
  productName = 'name',
  sku = 'sku',
  hgCode = 'hgCode',
}

export class TestUrls {
  private static API_URL = `${Cypress.env('PORTAL_API')}`

  private static urls = {
    search: '/products',
    product: '/products',
    marketing: '/marketing',
    productAllDraftChanges: '/all-draft-changes',
    productAllDraftChangesApproval: '/publish',
    productCategories: '/categories',
    productSetup: '/set-up',
    productTaxation: '/taxation',
    variant: '/variants',
    variantAttributes: '/attributes',
    variantAttributesUpdate: '/barista-attributes',
    variantDraftChanges: '/draft-changes',
    variantLabelling: '/labelling',
    variantNutritionals: '/nutrition',
    variantPricing: '/pricing',
    variantReporting: '/reporting',
    versions: '/versions',
    reviewMenuCategorisation: '/categories/review',
    reviewSetUp: '/set-up/review',
  }

  public static getSearchPageUrl(
    parameter: SearchQueryParameters = SearchQueryParameters.productName,
    searchPhrase?: string,
  ) {
    if (searchPhrase === undefined) {
      return `${this.urls.search}?limit=10&p=${parameter}&page=1`
    } else {
      const searchPhraseEncoded = encodeURI(searchPhrase)

      return `${this.urls.search}?limit=10&p=${parameter}&page=1&q=${searchPhraseEncoded}`
    }
  }

  public static getApiSearchUrl(parameter: SearchQueryParameters, searchPhrase: string) {
    const searchPhraseEncoded = searchPhrase.replaceAll(' ', '+')

    return `${this.API_URL}/v5/products?query=${searchPhraseEncoded}&propertyName=${parameter}&limit=10&page=1`
  }

  public static getHomepageUrl() {
    return '/home/'
  }

  public static getProductUrl(productSku: string) {
    return `${this.urls.product}/${productSku}`
  }

  public static getApiProductUrl(productSku: string) {
    return `${this.API_URL}/v3${this.getProductUrl(productSku)}`
  }

  public static getProductCategoriesUrl(productSku: string) {
    return `${this.getProductUrl(productSku)}${this.urls.productCategories}`
  }

  public static getHowToDisplayOptionsUrl(productType: string) {
    return `${this.API_URL}/v3/product-types/${productType}/how-to-display`
  }

  public static getLabellingOptionsUrl() {
    return `${this.API_URL}/v3/product-types/food/labelling-options`
  }

  public static getReportingOptionsUrl(productType: string) {
    return `${this.API_URL}/v3/product-types/${productType}/reporting`
  }

  public static getApiProductCategoriesUrl(productSku: string) {
    return `${this.API_URL}/v3${this.getProductCategoriesUrl(productSku)}`
  }

  public static getProductTaxationUrl(productSku: string) {
    return `${this.getProductUrl(productSku)}${this.urls.productTaxation}`
  }

  public static getApiProductTaxationUrl(productSku: string) {
    return `${this.API_URL}/v3${this.getProductTaxationUrl(productSku)}`
  }

  public static getProductSetupUrl(productSku: string) {
    return `${this.getProductUrl(productSku)}${this.urls.productSetup}`
  }

  public static getApiProductSetupUrl(productSku: string) {
    return `${this.API_URL}/v3${this.getProductSetupUrl(productSku)}`
  }

  public static getVariantUrl(productSku: string, variantSku: string) {
    return `${this.getProductUrl(productSku)}${this.urls.variant}/${variantSku}`
  }

  public static getVariantReporingUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.variantReporting}`
  }

  public static getVariantAtribitesUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.variantAttributes}`
  }

  public static getApiVariantAttributesUrl(productSku: string, variantSku: string) {
    return `${this.API_URL}/v3${this.getVariantUrl(productSku, variantSku)}${
      this.urls.variantAttributesUpdate
    }`
  }

  public static getVariantLabellingUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.variantLabelling}`
  }

  public static getApiVariantLabellingUrl(productSku: string, variantSku: string) {
    return `${this.API_URL}/v3${this.getVariantLabellingUrl(productSku, variantSku)}`
  }

  public static getVariantNutritionalsUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.variantNutritionals}`
  }

  public static getVariantMarketingUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.marketing}`
  }

  public static getApiVariantMarketingUrl(productSku: string, variantSku: string) {
    return `${this.API_URL}/v3${this.getVariantMarketingUrl(productSku, variantSku)}`
  }

  public static getApiVariantReportingUrl(productSku: string, variantSku: string) {
    return `${this.API_URL}/v3${this.getVariantReporingUrl(productSku, variantSku)}`
  }

  public static getApiVariantPricingUrl(productSku: string, variantSku: string) {
    return `${this.API_URL}/v3${this.getVariantPricingUrl(productSku, variantSku)}`
  }

  public static getVariantPricingUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.variantPricing}`
  }

  public static getVariantDraftchangesUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.variantDraftChanges}`
  }

  public static getProductAllDraftChangesUrl(productSku: string) {
    return `${this.getProductUrl(productSku)}${this.urls.productAllDraftChanges}`
  }

  public static getApiProductAllDraftChangesApprovalUrl(productSku: string) {
    return `${this.API_URL}/v3${this.getProductUrl(productSku)}${
      this.urls.productAllDraftChangesApproval
    }`
  }

  public static getApiBarcodeUrl(eanCode: string) {
    return `${this.API_URL}/v3/barcode/${eanCode}`
  }

  public static getVariantVersionHistoryUrl(productSku: string, variantSku: string) {
    return `${this.getVariantUrl(productSku, variantSku)}${this.urls.versions}`
  }

  public static getApiVersionUrl(productSku: string, variantSku: string, versionKey: string) {
    return `${this.API_URL}/v3${this.getVariantUrl(productSku, variantSku)}/versions/${versionKey}`
  }

  public static getVersionUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
  ) {
    return `${this.getVariantUrl(productSku, variantSku)}/versions/${versionNumber}`
  }

  public static getVersionPricingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
  ) {
    return `${this.getVersionUrl(productSku, variantSku, versionNumber)}${this.urls.variantPricing}`
  }

  public static getVersionReportingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
  ) {
    return `${this.getVersionUrl(productSku, variantSku, versionNumber)}${
      this.urls.variantReporting
    }`
  }

  public static getVersionNutritionalsUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
  ) {
    return `${this.getVersionUrl(productSku, variantSku, versionNumber)}${
      this.urls.variantNutritionals
    }`
  }

  public static getVersionLabellingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
  ) {
    return `${this.getVersionUrl(productSku, variantSku, versionNumber)}${
      this.urls.variantLabelling
    }`
  }

  public static getVersionDraftChangesUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
  ) {
    return `${this.getVersionUrl(productSku, variantSku, versionNumber)}${
      this.urls.variantDraftChanges
    }`
  }

  public static getApiVersionMarketingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
    hgCode: string,
  ) {
    return `${this.API_URL}/v3${this.getVariantUrl(
      productSku,
      variantSku,
    )}/versions/${hgCode}-${versionNumber}/marketing`
  }

  public static getApiVersionPricingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
    hgCode: string,
  ) {
    return `${this.API_URL}/v3${this.getVariantUrl(
      productSku,
      variantSku,
    )}/versions/${hgCode}-${versionNumber}/pricing`
  }

  public static getApiVersionReportingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
    hgCode: string,
  ) {
    return `${this.API_URL}/v3${this.getVariantUrl(
      productSku,
      variantSku,
    )}/versions/${hgCode}-${versionNumber}/reporting`
  }

  public static getApiVersionLabellingUrl(
    productSku: string,
    variantSku: string,
    versionNumber: string | number,
    hgCode: string,
  ) {
    return `${this.API_URL}/v3${this.getVariantUrl(
      productSku,
      variantSku,
    )}/versions/${hgCode}-${versionNumber}/labelling`
  }

  public static getApiBrowsePendingUrl(country: CountryFilters) {
    return `${this.API_URL}/v1/browse/pending?country=${country}`
  }

  public static getApiBrowseNewUrl(country: CountryFilters) {
    return `${this.API_URL}/v1/browse/new?country=${country}`
  }

  public static getApiBrowseLiveSoonUrl(country: CountryFilters) {
    return `${this.API_URL}/v1/browse/live-soon?country=${country}`
  }

  public static getApiBrowseDelistSoonUrl(country: CountryFilters) {
    return `${this.API_URL}/v1/browse/delist-soon?country=${country}`
  }

  public static getreviewMenuCategorisationUrl(sku: string) {
    return `${this.API_URL}/v3/products/${sku}/categories/review`
  }

  public static getreviewSetUpUrl(sku: string) {
    return `${this.API_URL}/v3/products/${sku}/set-up/review`
  }

  public static getreviewMarketingUrl(sku: string, variantSku: string) {
    return `${this.API_URL}/v3/products/${sku}/variants/${variantSku}/marketing/review`
  }
}
