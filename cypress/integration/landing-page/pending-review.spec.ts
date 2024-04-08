import { getPendingReviewResponseMock } from 'cypress/fixtures/mocks/landing-page-responses.mock'
import { LandingPage } from 'cypress/pages/LandingPage'
import { CountryFilters, TestUrls } from 'cypress/support/TestUrls'
import { CountryCode } from 'src/shared/model/country-code'

describe('Landing Page - pending review tab', () => {
  const landingPage = new LandingPage()

  it('"No draft changes" messaging is displayed when No draft changes exist against any products', () => {
    const productGroupsQuantity = 0
    const noPendingDraftChangesResponse = getPendingReviewResponseMock(productGroupsQuantity)

    cy.intercept(
      'GET',
      TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
      noPendingDraftChangesResponse,
    )
    cy.visit(TestUrls.getHomepageUrl())
    landingPage.pendingTab().should('have.text', 'Pending review 0')
    cy.contains(landingPage.texts.noPendingReview).scrollIntoView().should('be.visible')
  })

  it('displays product group without expand accordion when draft changes exist against Product Group only', () => {
    const productGroupsQuantity = 1
    const productGroupsChanges = 1
    const variantChanges = 0
    const versionChanges = 0
    const pendingReviewResponseMock = getPendingReviewResponseMock(
      productGroupsQuantity,
      productGroupsChanges,
      variantChanges,
      versionChanges,
    )
    cy.intercept(
      'GET',
      TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
      pendingReviewResponseMock,
    ).as('pendingResponse')
    cy.visit(TestUrls.getHomepageUrl())
    cy.wait('@pendingResponse')

    cy.contains(pendingReviewResponseMock.productGroups[0].name['en-GB']).should('be.visible')
    cy.contains(landingPage.texts.productGroupRecipeId).should('be.visible')
    cy.contains(landingPage.texts.productGroupSku).should('be.visible')
    cy.contains(`${productGroupsChanges} changes`).should('be.visible')
    cy.get(landingPage.selectors.toggleArrow).should('not.exist')
  })

  it('displays variant when draft change exist against Product Group and Variant', () => {
    const productGroupsQuantity = 1
    const productGroupsChanges = 0
    const variantChanges = 1
    const versionChanges = 0
    const pendingReviewResponseMock = getPendingReviewResponseMock(
      productGroupsQuantity,
      productGroupsChanges,
      variantChanges,
      versionChanges,
    )
    cy.intercept(
      'GET',
      TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
      pendingReviewResponseMock,
    ).as('pendingResponse')
    cy.visit(TestUrls.getHomepageUrl())
    cy.wait('@pendingResponse')
    landingPage.expandRowByText(pendingReviewResponseMock.productGroups[0].name['en-GB'])
    cy.get(landingPage.selectors.toggleArrow).should('have.length', 1)
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].name['en-GB']).should(
      'be.visible',
    )
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].sku).should('be.visible')
  })

  it('displays version and does not display variant when draft change exist against Product Group and Version', () => {
    const productGroupsQuantity = 1
    const productGroupsChanges = 0
    const variantChanges = 0
    const versionChanges = 1
    const pendingReviewResponseMock = getPendingReviewResponseMock(
      productGroupsQuantity,
      productGroupsChanges,
      variantChanges,
      versionChanges,
    )
    cy.intercept(
      'GET',
      TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
      pendingReviewResponseMock,
    ).as('pendingResponse')
    cy.visit(TestUrls.getHomepageUrl())
    cy.wait('@pendingResponse')
    landingPage.expandRowByText(pendingReviewResponseMock.productGroups[0].name['en-GB'])
    cy.get(landingPage.selectors.toggleArrow).should('have.length', 1)
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].name['en-GB']).should(
      'not.exist',
    )
    cy.contains(
      pendingReviewResponseMock.productGroups[0].variants[0].versions[0].name['en-GB'],
    ).should('be.visible')
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].versions[0].sku).should(
      'be.visible',
    )
  })

  it('displays variant and version when draft change exist against Product Group, Variant and Version', () => {
    const productGroupsQuantity = 1
    const productGroupsChanges = 3
    const variantChanges = 2
    const versionChanges = 1
    const pendingReviewResponseMock = getPendingReviewResponseMock(
      productGroupsQuantity,
      productGroupsChanges,
      variantChanges,
      versionChanges,
    )
    cy.intercept(
      'GET',
      TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
      pendingReviewResponseMock,
    ).as('pendingResponse')
    cy.visit(TestUrls.getHomepageUrl())
    cy.wait('@pendingResponse')
    landingPage.expandRowByText(pendingReviewResponseMock.productGroups[0].name['en-GB'])
    landingPage.expandRowByText(
      pendingReviewResponseMock.productGroups[0].variants[0].name['en-GB'],
    )
    cy.get(landingPage.selectors.toggleArrow).should('have.length', 2)
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].name['en-GB']).should(
      'be.visible',
    )
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].sku).should('be.visible')
    cy.contains(
      pendingReviewResponseMock.productGroups[0].variants[0].versions[0].name['en-GB'],
    ).should('be.visible')
    cy.contains(pendingReviewResponseMock.productGroups[0].variants[0].versions[0].sku).should(
      'be.visible',
    )
  })

  describe('Draft changes existes against multiple product groups', () => {
    const productGroupsQuantity = 55
    const productGroupsChanges = 3
    const variantChanges = 2
    const versionChanges = 1
    const ukPendingReviewResponseMock = getPendingReviewResponseMock(
      productGroupsQuantity,
      productGroupsChanges,
      variantChanges,
      versionChanges,
      CountryCode.UK,
    )
    const frPendingReviewResponseMock = getPendingReviewResponseMock(
      productGroupsQuantity,
      productGroupsChanges,
      variantChanges,
      versionChanges,
      CountryCode.FR,
    )

    beforeEach(() => {
      cy.intercept(
        'GET',
        TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
        ukPendingReviewResponseMock,
      ).as('ukPendingResponse')
      cy.visit(TestUrls.getHomepageUrl())
      cy.wait('@ukPendingResponse')
    })

    it('allows to vist next page of results', () => {
      cy.contains('UK | Product group name mock 1-en-GB').should('be.visible')
      landingPage.nextPageButton().click()
      cy.contains('UK | Product group name mock 11-en-GB').should('be.visible')
      landingPage.lastPageButton().click()
      cy.contains('UK | Product group name mock 51-en-GB').should('be.visible')
      landingPage.prevPageButton().click()
      cy.contains('UK | Product group name mock 41-en-GB').should('be.visible')
      landingPage.firstPageButton().click()
      cy.contains('UK | Product group name mock 1-en-GB').should('be.visible')
    })

    it('displays proper product per page amount', () => {
      cy.contains('UK | Product group name mock 1-en-GB').should('be.visible')
      landingPage.expandRowByText('Product group name mock 1-en-GB')
      cy.contains('UK | Product group name mock 10-en-GB').should('be.visible')
      cy.contains('UK | Product group name mock 11-en-GB').should('not.exist')
    })

    it('allows to change product per page amount', () => {
      landingPage.changeProductsPerPage(50)
      cy.contains('UK | Product group name mock 1-en-GB').should('be.visible')
      cy.contains('UK | Product group name mock 50-en-GB').scrollIntoView().should('be.visible')
      landingPage.nextPageButton().click()
      cy.contains('UK | Product group name mock 51-en-GB').should('be.visible')
      landingPage.firstPageButton().click()
      landingPage.changeProductsPerPage(20)
      cy.contains('UK | Product group name mock 20-en-GB').scrollIntoView().should('be.visible')
      landingPage.nextPageButton().click()
      cy.contains('UK | Product group name mock 21-en-GB').scrollIntoView().should('be.visible')
      cy.contains('UK | Product group name mock 40-en-GB').scrollIntoView().should('be.visible')
    })

    it('allows to filter results by country', () => {
      cy.intercept(
        'GET',
        TestUrls.getApiBrowsePendingUrl(CountryFilters.FR),
        frPendingReviewResponseMock,
      ).as('frPendingResponse')

      landingPage.changeCountryFilter(CountryFilters.FR)
      cy.wait('@frPendingResponse')
      cy.contains('FR | Product group name mock 1-en-GB').should('be.visible')
      landingPage.changeCountryFilter(CountryFilters.UK)
      cy.contains('UK | Product group name mock 1-en-GB').should('be.visible')
    })
  })
})
