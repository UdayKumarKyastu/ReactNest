import { getPendingReviewResponseMock } from 'cypress/fixtures/mocks/landing-page-responses.mock'
import { LandingPage } from 'cypress/pages/LandingPage'
import { CountryFilters, SearchQueryParameters, TestUrls } from 'cypress/support/TestUrls'
import { CountryCode } from 'src/shared/model/country-code'

describe('Landing page', () => {
  const landingPage = new LandingPage()

  it('displays loading spinner before request response', () => {
    const ukPendingReviewProductsQuantity = 5
    const usPendingReviewProductsQuantity = 3
    const emptyResponse = getPendingReviewResponseMock(0)
    const pendingReviewResponse = getPendingReviewResponseMock(ukPendingReviewProductsQuantity)
    const usPendingResponse = getPendingReviewResponseMock(
      usPendingReviewProductsQuantity,
      1,
      1,
      1,
      CountryCode.US,
    )

    cy.intercept('GET', TestUrls.getApiBrowsePendingUrl(CountryFilters.UK))
    cy.visit(TestUrls.getHomepageUrl())

    cy.contains(landingPage.texts.loadingProducts).scrollIntoView().should('be.visible')
    landingPage.pendingTab().find(landingPage.selectors.spinner).should('be.visible')
    landingPage.newTab().find(landingPage.selectors.spinner).should('be.visible')
    landingPage.liveSoonTab().find(landingPage.selectors.spinner).should('be.visible')

    cy.intercept(
      'GET',
      TestUrls.getApiBrowsePendingUrl(CountryFilters.UK),
      pendingReviewResponse,
    ).as('ukPendingReview')
    cy.intercept('GET', TestUrls.getApiBrowseNewUrl(CountryFilters.UK), emptyResponse).as('ukNew')
    cy.intercept('GET', TestUrls.getApiBrowseLiveSoonUrl(CountryFilters.UK), emptyResponse).as(
      'ukLiveSoon',
    )
    cy.wait(['@ukPendingReview', '@ukNew', '@ukLiveSoon'], { timeout: 10000 })
    landingPage
      .pendingTab()
      .should('have.text', `Pending review ${ukPendingReviewProductsQuantity}`)
    landingPage.newTab().should('have.text', 'New 0')
    landingPage.liveSoonTab().should('have.text', 'Live soon 0')

    cy.intercept('GET', TestUrls.getApiBrowsePendingUrl(CountryFilters.US))
    landingPage.changeCountryFilter(CountryFilters.US)

    cy.contains(landingPage.texts.loadingProducts).scrollIntoView().should('be.visible')
    landingPage.pendingTab().find(landingPage.selectors.spinner).should('be.visible')
    landingPage.newTab().find(landingPage.selectors.spinner).should('be.visible')
    landingPage.liveSoonTab().find(landingPage.selectors.spinner).should('be.visible')

    cy.intercept('GET', TestUrls.getApiBrowsePendingUrl(CountryFilters.US), usPendingResponse).as(
      'usPendingReview',
    )
    cy.intercept('GET', TestUrls.getApiBrowseNewUrl(CountryFilters.US), emptyResponse).as('usNew')
    cy.intercept('GET', TestUrls.getApiBrowseLiveSoonUrl(CountryFilters.US), emptyResponse).as(
      'usLiveSoon',
    )
    cy.wait(['@usPendingReview', '@usNew', '@usLiveSoon'], { timeout: 10000 })

    cy.contains(landingPage.texts.loadingProducts).should('not.exist')
    landingPage
      .pendingTab()
      .should('have.text', `Pending review ${usPendingReviewProductsQuantity}`)
    landingPage.newTab().should('have.text', 'New 0')
    landingPage.liveSoonTab().should('have.text', 'Live soon 0')
  })

  it('displays proper product groups results amount for each tab (and country)', () => {
    const ukPendingResponse = getPendingReviewResponseMock(25, 1, 1, 1, CountryCode.UK)
    const ukNewResponse = getPendingReviewResponseMock(22, 1, 1, 1, CountryCode.UK)
    const ukLiveSoonResponse = getPendingReviewResponseMock(20, 1, 1, 1, CountryCode.UK)
    const usPendingResponse = getPendingReviewResponseMock(9, 1, 1, 1, CountryCode.US)
    const usNewResponse = getPendingReviewResponseMock(5, 1, 1, 1, CountryCode.US)
    const usLiveSoonResponse = getPendingReviewResponseMock(3, 1, 1, 1, CountryCode.US)

    cy.intercept('GET', TestUrls.getApiBrowsePendingUrl(CountryFilters.UK), ukPendingResponse).as(
      'ukPending',
    )
    cy.intercept('GET', TestUrls.getApiBrowseNewUrl(CountryFilters.UK), ukNewResponse).as('ukNew')
    cy.intercept('GET', TestUrls.getApiBrowseLiveSoonUrl(CountryFilters.UK), ukLiveSoonResponse).as(
      'ukLiveSoon',
    )

    cy.visit(TestUrls.getHomepageUrl())
    cy.wait(['@ukPending', '@ukNew', '@ukLiveSoon'], { timeout: 10000 })

    cy.contains('UK | Product group name mock').should('be.visible')
    landingPage.pendingTab().should('have.text', 'Pending review 25')
    landingPage.newTab().should('have.text', 'New 22')
    landingPage.liveSoonTab().should('have.text', 'Live soon 20')

    cy.intercept('GET', TestUrls.getApiBrowsePendingUrl(CountryFilters.US), usPendingResponse).as(
      'usPending',
    )
    cy.intercept('GET', TestUrls.getApiBrowseNewUrl(CountryFilters.US), usNewResponse).as('usNew')
    cy.intercept('GET', TestUrls.getApiBrowseLiveSoonUrl(CountryFilters.US), usLiveSoonResponse).as(
      'usLiveSoon',
    )

    landingPage.changeCountryFilter(CountryFilters.US)
    cy.wait(['@usPending', '@usNew', '@usLiveSoon'], { timeout: 10000 })

    cy.contains('US | Product group name mock').should('be.visible')
    landingPage.pendingTab().should('have.text', 'Pending review 9')
    landingPage.newTab().should('have.text', 'New 5')
    landingPage.liveSoonTab().should('have.text', 'Live soon 3')
  })

  it('search by product name redirects to search page with results for product name', () => {
    const searchProductPhrase = 'coffee'
    cy.visit(TestUrls.getHomepageUrl())
    cy.intercept(
      'GET',
      TestUrls.getApiSearchUrl(SearchQueryParameters.productName, searchProductPhrase),
    )
    landingPage.searchByProductName(searchProductPhrase)
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}${TestUrls.getSearchPageUrl(
        SearchQueryParameters.productName,
        searchProductPhrase,
      )}`,
    )
  })

  it('search by sku redirects to search page with results for sku', () => {
    const searchSku = 'UK001'
    cy.visit(TestUrls.getHomepageUrl())
    cy.intercept('GET', TestUrls.getApiSearchUrl(SearchQueryParameters.sku, searchSku))
    landingPage.searchBySku(searchSku)
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}${TestUrls.getSearchPageUrl(
        SearchQueryParameters.sku,
        searchSku,
      )}`,
    )
  })

  it('search by hamilton grant redirects to search page with results for hamilton grant', () => {
    const searchHgCode = 'FP0000001'
    cy.visit(TestUrls.getHomepageUrl())
    cy.intercept('GET', TestUrls.getApiSearchUrl(SearchQueryParameters.hgCode, searchHgCode))
    landingPage.searchByHamiltonGrant(searchHgCode)
    cy.url().should(
      'eq',
      `${Cypress.config().baseUrl}${TestUrls.getSearchPageUrl(
        SearchQueryParameters.hgCode,
        searchHgCode,
      )}`,
    )
  })
})
