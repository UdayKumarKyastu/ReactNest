export class BreadcumbComponent {
  breadcumb = () => {
    return cy.get('[data-cy="breadcrumb"]')
  }
  anchors = () => {
    return cy.get('[data-cy="breadcrumb"] a')
  }
  searchProductAnchor = () => {
    return this.anchors().eq(0)
  }
  productAnchor = () => {
    return this.anchors().eq(1)
  }
  variantAnchor = () => {
    return this.anchors().eq(2)
  }

  readonly texts = {
    searchProductAnchor: 'Search Products',
    masterVariant: 'Master Variant',
  }

  checkBreadcumbContentOnProductPage(productName: string) {
    this.breadcumb()
      .invoke('text')
      .then((text) => {
        const actualBreadcrumb = text
        const expectedBreadcrumb = `${this.texts.searchProductAnchor}${productName}`

        expect(actualBreadcrumb).to.eq(expectedBreadcrumb)
      })
  }

  checkBreadcumbContentOnMasterVariantPage(productName: string) {
    this.breadcumb()
      .invoke('text')
      .then((text) => {
        const actualBreadcrumb = text
        const expectedBreadcrumb = `${this.texts.searchProductAnchor}${productName}${this.texts.masterVariant}`

        expect(actualBreadcrumb).to.eq(expectedBreadcrumb)
      })
  }

  checkBreadcumbContentOnNonMasterVariantPage(productName: string, variantName: string) {
    this.breadcumb()
      .invoke('text')
      .then((text) => {
        const actualBreadcrumb = text
        const expectedBreadcrumb = `${this.texts.searchProductAnchor}${productName}${variantName}`

        expect(actualBreadcrumb).to.eq(expectedBreadcrumb)
      })
  }

  checkBreadcumbContentOnVersionPage(productName: string, versionNumber: string | number) {
    versionNumber =
      typeof versionNumber === 'string' ? Number.parseInt(versionNumber) : versionNumber
    this.breadcumb()
      .invoke('text')
      .then((text) => {
        const actualBreadcrumb = text
        const expectedBreadcrumb = `${this.texts.searchProductAnchor}${productName}${this.texts.masterVariant}Version ${versionNumber}`

        expect(actualBreadcrumb).to.eq(expectedBreadcrumb)
      })
  }
}
