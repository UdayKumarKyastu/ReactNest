import React, { ReactNode } from 'react'
import { TableSectionHeadline } from '../../../common/components/SideBySideTable/SideBySideTable'
import { Product } from '../../model/product'
import { Translation } from '../../../i18n/Translation'

export declare namespace ProductTaxationComparisonFields {
  export type Section = {
    leftCol: ReactNode
    rightCol: ReactNode
  }
}

export abstract class ProductTaxationComparisonFields {
  static prepareSections({
    product,
    translate,
  }: {
    product: Product
    translate: Translation.TranslationFunc
  }): Array<ProductTaxationComparisonFields.Section> {
    return [
      {
        leftCol: (
          <TableSectionHeadline marginTop={false}>
            <p>{translate('taxationPage.categoryLabel')}</p>
            {product.taxCategory?.name || translate('taxationPage.noCategoryFallbackLabel')}
          </TableSectionHeadline>
        ),
        rightCol: (
          <TableSectionHeadline marginTop={false}>
            <p>{translate('taxationPage.categoryLabel')}</p>
            {product.availableTaxCategories.find(
              (cat) => cat.id === product.draftChanges?.taxCategory.id,
            )?.name || translate('taxationPage.noCategoryFallbackLabel')}
          </TableSectionHeadline>
        ),
      },
    ]
  }

  static countTaxationChanges(product: Product): number {
    return Boolean(product.draftChanges.taxCategory.id) === Boolean(product.taxCategory?.id) ? 1 : 0
  }
}
