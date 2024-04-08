import { TestUrls } from 'cypress/support/TestUrls'
import { GetProductVariantVersionDto } from 'src/modules/product/dto/get-product-variant-version.dto'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { VariantVersionPublishState } from 'src/modules/product/model/variant-version-publish-state'

export const getElementByDataTestId = (dataTestId: string) => cy.get(`[data-testid=${dataTestId}]`)

export const getFormatedProductCardDate = (date: string) => {
  const dateObj = new Date(date)
  const day = dateObj.toLocaleDateString('en-Gb')
  const time = dateObj.toLocaleTimeString('en-Gb', { hour: '2-digit', minute: '2-digit' })

  return `${day} ${time}`
}

export const countProductChanges = (response: GetProductDto.ProductResponse) => {
  let variantsChanges = 0
  response.draftChanges.variants.forEach((v) => (variantsChanges += v.changesCount.total))
  const expectedDraftChangesQuantity = response.draftChanges.changesCount.total + variantsChanges

  return expectedDraftChangesQuantity
}

export const generateRandomString = (length: number) => {
  const characters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const getFormatedToastDate = (date: string | null) => {
  return date ? new Date(date).toLocaleDateString('en-GB') : 'N/A'
}

const getExpectedVersionToastMessage = (versionResponse: GetProductVariantVersionDto) => {
  const fromDate = getFormatedToastDate(versionResponse.variant.availability.liveSchedule.on)
  const untilDate = getFormatedToastDate(versionResponse.variant.availability.liveSchedule.off)

  if (versionResponse.publishState === VariantVersionPublishState.PREVIOUS) {
    return `${versionResponse.variant.name['en-GB']}, version ${versionResponse.variantVersion} was live from ${fromDate} until ${untilDate}`
  } else if (versionResponse.publishState === VariantVersionPublishState.FUTURE) {
    return `${versionResponse.variant.name['en-GB']}, version ${versionResponse.variantVersion} will be live from ${fromDate} until ${untilDate}`
  }
  throw new Error('Toast message is expected only for previous or future version')
}

const getExpectedVersionToastHeader = (versionResponse: GetProductVariantVersionDto) => {
  if (versionResponse.publishState === VariantVersionPublishState.PREVIOUS) {
    return 'This is a previous version of this product'
  } else if (versionResponse.publishState === VariantVersionPublishState.FUTURE) {
    return 'This is a future version of this product'
  }
  throw new Error('Toast message is expected only for previous or future version')
}

export const verifyVersionToastMessage = (versionResponse: GetProductVariantVersionDto) => {
  const expectedToastHeader = getExpectedVersionToastHeader(versionResponse)
  const expectedToastMessage = getExpectedVersionToastMessage(versionResponse)
  const expectedSeeCurrentVersionLink = TestUrls.getVariantUrl(
    versionResponse.variant.sku,
    versionResponse.variant.sku,
  )
  cy.contains(expectedToastHeader).scrollIntoView().should('be.visible')
  cy.contains(expectedToastMessage).scrollIntoView().should('be.visible')
  cy.contains('See current version')
    .scrollIntoView()
    .should('be.visible')
    .invoke('attr', 'href')
    .then((href: string) => {
      expect(href).to.eq(expectedSeeCurrentVersionLink)
    })
}
