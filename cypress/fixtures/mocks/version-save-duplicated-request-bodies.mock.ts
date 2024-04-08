export const getVersionUpdateLabellingBodyMock = () => {
  return {
    canBeCookedInTurboChef: false,
    countryOfOriginDescription: null,
    ean13Code: null,
    includeAverageWeightOnLabel: false,
    includeNutritionalInformationOnLabel: false,
    isDuplicatedData: true,
    legalTitle: null,
    productServes: null,
    sellBy: null,
    sellByTurboChef: null,
    storageConditions: null,
    useBy: null,
    useByTurboChef: null,
  }
}

export const getVersionUpdateReportingBodyMock = (sku: string, hgCode: string) => {
  return {
    dateLastUpdatedOnHamiltonGrant: null,
    hamiltonGrantProductCode: hgCode,
    isDuplicatedData: true,
    pluPrimaryCategoryID: null,
    pluReportingName: null,
    pluSecondaryCategoryID: null,
    pointOfSaleID: null,
    sku: sku,
    starKisProductCategoryID: null,
    starKisProductSubCategoryID: null,
  }
}
