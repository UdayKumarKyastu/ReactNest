import { PendingReviewProductGroup } from './pending-review-product'
import { GetPendingReviewProductsDto } from '../dto/get-pending-review-products.dto'
import { LiveSoonProductGroup } from './live-soon-product'
import { GetLiveSoonProductsDto } from '../dto/get-live-soon-products.dto'
import { NewProductGroup } from './new-product'
import { GetNewProductsDto } from '../dto/get-new-products.dto'
import { GetDelistSoonProductsDto } from '../dto/get-delist-soon-products.dto'
import { DelistSoonProductGroup } from './delist-soon-product'

export abstract class ProductNotificationsMapper {
  static singleToPendingReviewProduct = (
    dto: GetPendingReviewProductsDto.ProductGroup,
  ): PendingReviewProductGroup => {
    return {
      name: dto.name,
      sku: dto.sku,
      countryCode: dto.countryCode,
      changesCount: dto.changesCount,
      imageUrl: dto.imageUrl,
      variants: dto.variants.map((variant) => ({
        name: variant.name,
        isMaster: variant.isMaster,
        countryCode: variant.countryCode,
        changesCount: variant.changesCount,
        sku: variant.sku,
        imageUrl: variant.imageUrl,
        recipeID: variant.recipeID,
        versionNumber: variant.versionNumber,
        versions: variant.versions.map((version) => ({
          name: version.name,
          isMaster: version.isMaster,
          countryCode: version.countryCode,
          changesCount: version.changesCount,
          sku: version.sku,
          imageUrl: version.imageUrl,
          recipeID: version.recipeID,
          versionNumber: version.versionNumber,
        })),
      })),
    }
  }

  static singleToLiveSoonProduct = (
    dto: GetLiveSoonProductsDto.ProductGroup,
  ): LiveSoonProductGroup => {
    return {
      name: dto.name,
      sku: dto.sku,
      countryCode: dto.countryCode,
      imageUrl: dto.imageUrl,
      variants: dto.variants.map((variant) => ({
        name: variant.name,
        isMaster: variant.isMaster,
        countryCode: variant.countryCode,
        sku: variant.sku,
        imageUrl: variant.imageUrl,
        recipeID: variant.recipeID,
        versionNumber: variant.versionNumber,
        liveFrom: variant.liveFrom,
        versions: variant.versions.map((version) => ({
          name: version.name,
          isMaster: version.isMaster,
          countryCode: version.countryCode,
          sku: version.sku,
          imageUrl: version.imageUrl,
          recipeID: version.recipeID,
          versionNumber: version.versionNumber,
          liveFrom: version.liveFrom,
        })),
      })),
    }
  }

  static singleToNewProduct = (dto: GetNewProductsDto.ProductGroup): NewProductGroup => {
    return {
      name: dto.name,
      sku: dto.sku,
      countryCode: dto.countryCode,
      imageUrl: dto.imageUrl,
      variants: dto.variants.map((variant) => ({
        name: variant.name,
        isMaster: variant.isMaster,
        countryCode: variant.countryCode,
        sku: variant.sku,
        imageUrl: variant.imageUrl,
        recipeID: variant.recipeID,
        versionNumber: variant.versionNumber,
        createdAt: variant.createdAt,
        versions: variant.versions.map((version) => ({
          name: version.name,
          isMaster: version.isMaster,
          countryCode: version.countryCode,
          sku: version.sku,
          imageUrl: version.imageUrl,
          recipeID: version.recipeID,
          versionNumber: version.versionNumber,
          createdAt: version.createdAt,
        })),
      })),
    }
  }

  static singleToDelistSoonProduct = (
    dto: GetDelistSoonProductsDto.ProductGroup,
  ): DelistSoonProductGroup => {
    return {
      name: dto.name,
      sku: dto.sku,
      countryCode: dto.countryCode,
      imageUrl: dto.imageUrl,
      variants: dto.variants.map((variant) => ({
        name: variant.name,
        isMaster: variant.isMaster,
        countryCode: variant.countryCode,
        sku: variant.sku,
        imageUrl: variant.imageUrl,
        recipeID: variant.recipeID,
        versionNumber: variant.versionNumber,
        liveTo: variant.liveTo,
        liveFrom: variant.liveFrom,
        versions: variant.versions.map((version) => ({
          name: version.name,
          isMaster: version.isMaster,
          countryCode: version.countryCode,
          sku: version.sku,
          imageUrl: version.imageUrl,
          recipeID: version.recipeID,
          versionNumber: version.versionNumber,
          liveTo: version.liveTo,
          liveFrom: version.liveFrom,
        })),
      })),
    }
  }
}
