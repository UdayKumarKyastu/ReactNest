import { GetProductDto } from '../dto/get-product.dto'
import { Product } from './product'
import { CountryCode } from '../../../shared/model/country-code'
import { SearchProductsDto } from '../../search/dto/search-products.dto'
import { ProductSearchItem } from './product-search-result'
import { Locale } from '../../i18n/Locale'
import { Availability } from './product-availability'
import { HamiltonGrant } from './hamilton-grant'

export abstract class ProductDtoMapper {
  static singleToProduct(dto: GetProductDto.ProductResponse): Product {
    const masterVariant = dto.product.variants.find((variant) => variant.isMaster)!

    return {
      name: dto.product.name,
      masterVariant: {
        ...masterVariant,
        masterSku: masterVariant.sku,
        isMaster: true,
        hamiltonGrant: new HamiltonGrant({
          ...masterVariant.hamiltonGrant,
          lastSyncedAt: masterVariant.hamiltonGrant.lastSyncedAt
            ? new Date(masterVariant.hamiltonGrant.lastSyncedAt).toISOString()
            : null,
          constituentHGCodes: masterVariant.hamiltonGrant.constituentHGCodes,
          hgRecipeStatus: masterVariant.hamiltonGrant.hgRecipeStatus,
          recipeTypes: masterVariant.hamiltonGrant.recipeTypes,
        }),
        pluReportingName: masterVariant.pluReportingName,
        pluPrimaryCategoryID: masterVariant.pluPrimaryCategoryID,
        pluSecondaryCategoryID: masterVariant.pluSecondaryCategoryID,
        labelling: masterVariant.labelling,
        productRange: masterVariant.productRange,
        parentProductSku: masterVariant.parentProductSku,
        productionCategories: {
          category: masterVariant.starKisProductCategoryID,
          subcategory: masterVariant.starKisProductSubCategoryID,
        },
        availability: Availability.fromDto(masterVariant.availability),
        pos: masterVariant.posID,
        prices: masterVariant.prices,
        version: masterVariant.version,
        versions: masterVariant.versions,
        published: dto.product.published,
        createdAt: dto.product.createdAt ? new Date(dto.product.createdAt).toISOString() : null,
      },
      variants: dto.product.variants
        .filter((variant) => !variant.isMaster)
        .map((variant) => ({
          ...variant,
          masterSku: masterVariant.sku,
          isMaster: false,
          hamiltonGrant: new HamiltonGrant({
            ...variant.hamiltonGrant,
            lastSyncedAt: variant.hamiltonGrant.lastSyncedAt
              ? new Date(variant.hamiltonGrant.lastSyncedAt).toISOString()
              : null,
            constituentHGCodes: masterVariant.hamiltonGrant.constituentHGCodes,
            hgRecipeStatus: variant.hamiltonGrant.hgRecipeStatus,
            recipeTypes: variant.hamiltonGrant.recipeTypes,
          }),
          availability: Availability.fromDto(variant.availability),
          pluReportingName: variant.pluReportingName,
          pluPrimaryCategoryID: variant.pluPrimaryCategoryID,
          pluSecondaryCategoryID: variant.pluSecondaryCategoryID,
          productionCategories: {
            category: variant.starKisProductCategoryID,
            subcategory: variant.starKisProductSubCategoryID,
          },
          productRange: variant.productRange,
          parentProductSku: variant.parentProductSku,
          published: dto.product.published,
          createdAt: dto.product.createdAt,
          pos: variant.posID,
          prices: variant.prices,
          version: variant.version,
          versions: variant.versions,
        })),
      sku: masterVariant.sku,
      setUp: dto.product.setUp,
      country: dto.product.country,
      countryCode: dto.product.countryCode,
      taxCategory: dto.product.taxCategory,
      categories: dto.product.categories,
      description: dto.product.description,
      published: dto.product.published,
      createdAt: dto.product.createdAt ? new Date(dto.product.createdAt).toISOString() : null,
      type: dto.product.type,
      takeAwayTaxDisabled: dto.product.takeAwayTaxDisabled,
      draftChanges: {
        lastEdit: new Date(dto.draftChanges.lastEdit),
        name: dto.draftChanges.name,
        description: dto.draftChanges.description,
        taxCategory: dto.draftChanges.taxCategory,
        changesCount: dto.draftChanges.changesCount,
        categories: dto.draftChanges.categories,
        setUp: dto.draftChanges.setUp,
        type: dto.product.type,
        variants: dto.draftChanges.variants.map((variant) => ({
          ...variant,
          masterSku: masterVariant.sku,
          isMaster: false,
          hamiltonGrant: new HamiltonGrant({
            ...variant.hamiltonGrant,
            allergens: variant.hamiltonGrant.allergens,
            lastSyncedAt: variant.hamiltonGrant.lastSyncedAt
              ? new Date(variant.hamiltonGrant.lastSyncedAt).toISOString()
              : null,
            constituentHGCodes: masterVariant.hamiltonGrant.constituentHGCodes,
            recipeTypes: variant.hamiltonGrant.recipeTypes,
          }),
          availability: Availability.fromDto(variant.availability),
          pluReportingName: variant.pluReportingName,
          pluPrimaryCategoryID: variant.pluPrimaryCategoryID,
          pluSecondaryCategoryID: variant.pluSecondaryCategoryID,
          labelling: variant.labelling,
          productRange: variant.productRange,
          parentProductSku: variant.parentProductSku,
          productionCategories: {
            category: variant.starKisProductCategoryID,
            subcategory: variant.starKisProductSubCategoryID,
          },
          pos: variant.posID,
          changesCount: variant.changesCount,
          prices: variant.prices,
          published: dto.product.published,
          createdAt: dto.product.createdAt,
        })),
        reviewStatuses: dto.draftChanges.reviewStatuses,
      },
      availableTaxCategories: dto.taxCategories,
      version: dto.version,
    }
  }

  static searchCollectionToProducts(dto: SearchProductsDto.Response): ProductSearchItem[] {
    return dto.products.map((productGroup) => {
      const masterVariant = productGroup.variants?.find((variant) => variant.isMaster)!
      return {
        name: new Locale.MultilangString(productGroup.name),
        imageUrl: masterVariant.imageUrl,
        sku: productGroup.sku,
        hgCode: masterVariant.hgCode,
        type: 'group',
        status: productGroup.published,
        masterSku: masterVariant.sku,
        countryCode: productGroup.countryCode as CountryCode,
        createdAt: masterVariant.createdAt,
        isMaster: masterVariant.isMaster,
        visibleOnWebsite: masterVariant.visibleOnWebsite,
        published: productGroup.published,
        visibleOnWebsiteVariants: productGroup.visibleOnWebsiteVariants,
        variants: productGroup.variants.map((variant) => ({
          name: new Locale.MultilangString(variant.name),
          imageUrl: variant.imageUrl,
          sku: variant.sku,
          hgCode: variant.hgCode,
          type: variant.isMaster ? 'master-variant' : 'variant',
          status: variant.published,
          masterSku: variant.sku,
          countryCode: variant.countryCode as CountryCode,
          createdAt: variant.createdAt,
          isMaster: variant.isMaster,
          visibleOnWebsite: variant.visibleOnWebsite,
          published: variant.published,
        })),
      }
    })
  }
}
