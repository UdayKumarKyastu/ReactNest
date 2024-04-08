import { HamiltonGrant } from './hamilton-grant'
import { ProductVariantVersion } from './product-variant'
import { GetProductVariantVersionDto } from '../dto/get-product-variant-version.dto'
import { Availability } from './product-availability'

export abstract class ProductVariantVersionDtoMapper {
  static singleToVersion(dto: GetProductVariantVersionDto): ProductVariantVersion {
    return {
      ...dto.variant,
      isMaster: dto.variant.isMaster,
      hamiltonGrant: new HamiltonGrant({
        ...dto.variant.hamiltonGrant,
        allergens: dto.variant.hamiltonGrant.allergens,
        lastSyncedAt: dto.variant.hamiltonGrant.lastSyncedAt
          ? new Date(dto.variant.hamiltonGrant.lastSyncedAt).toISOString()
          : null,
        constituentHGCodes: dto.variant.hamiltonGrant.constituentHGCodes,
      }),
      availability: Availability.fromDto(dto.variant.availability),
      pluReportingName: dto.variant.pluReportingName,
      pluPrimaryCategoryID: dto.variant.pluPrimaryCategoryID,
      pluSecondaryCategoryID: dto.variant.pluSecondaryCategoryID,
      labelling: dto.variant.labelling,
      productRange: dto.variant.productRange,
      parentProductSku: dto.variant.parentProductSku,
      productionCategories: {
        category: dto.variant.starKisProductCategoryID,
        subcategory: dto.variant.starKisProductSubCategoryID,
      },
      changesCount: dto.variant.changesCount,
      prices: dto.variant.prices,
      version: dto.variantVersion,
      versionKey: dto.key,
      publishState: dto.publishState,
      pos: dto.variant.posID,
      versions: dto.variant.versions,
      masterSku: '',
      draft: {
        ...dto.draft,
        isMaster: dto.draft.isMaster,
        hamiltonGrant: new HamiltonGrant({
          ...dto.draft.hamiltonGrant,
          allergens: dto.draft.hamiltonGrant.allergens,
          lastSyncedAt: dto.draft.hamiltonGrant.lastSyncedAt
            ? new Date(dto.draft.hamiltonGrant.lastSyncedAt).toISOString()
            : null,
          constituentHGCodes: dto.draft.hamiltonGrant.constituentHGCodes,
        }),
        availability: Availability.fromDto(dto.draft.availability),
        pluReportingName: dto.draft.pluReportingName,
        pluPrimaryCategoryID: dto.draft.pluPrimaryCategoryID,
        pluSecondaryCategoryID: dto.draft.pluSecondaryCategoryID,
        labelling: dto.draft.labelling,
        productRange: dto.draft.productRange,
        parentProductSku: dto.draft.parentProductSku,
        productionCategories: {
          category: dto.draft.starKisProductCategoryID,
          subcategory: dto.draft.starKisProductSubCategoryID,
        },
        changesCount: dto.draft.changesCount,
        prices: dto.draft.prices,
        version: dto.variantVersion,
        versionKey: dto.key,
        publishState: dto.publishState,
        pos: dto.variant.posID,
        versions: dto.variant.versions,
        masterSku: '',
      },
      approvedTabs: dto.approvedTabs,
      draftTabs: dto.draftTabs,
    }
  }
}
