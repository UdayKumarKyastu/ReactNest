import { getSearchResultsMock } from 'cypress/fixtures/mocks/search-results.mock'
import { SearchPage } from 'cypress/pages/ProductSearchPage'
import { SearchQueryParameters, TestUrls } from 'cypress/support/TestUrls'
import { ProductMenuCategorisationPage } from 'cypress/pages/product-group/ProductMenuCategorisationPage'
import { ProductDtoMockBuilder } from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'

describe('Product Search', () => {
  const searchPage = new SearchPage()
  const productMenuCategorisationPage = new ProductMenuCategorisationPage()
  const emptyResponse = { products: [], total: 0 }

  const verifySearchResults = (
    responseMock: ReturnType<typeof getSearchResultsMock>,
    resultsQuantity: number,
  ) => {
    searchPage.tableRow().should('have.length', resultsQuantity)
    searchPage
      .tableRow(responseMock.products[0].name['en-GB'])
      .should('contain.text', 'All Product IDs')
      .and('contain.text', 'All Product SKUs')
      .and('contain.text', 'All Product SKUs')
      .and('contain.text', new Date(responseMock.products[0].createdAt).toLocaleDateString('en-GB'))
      .and('contain.text', 'Published')

    searchPage
      .tableRow(responseMock.products[0].name['en-GB'])
      .find(searchPage.selectors.toggleArrow)
      .click()

    searchPage
      .tableRow(responseMock.products[0].variants[0].name['en-GB'])
      .should('contain.text', responseMock.products[0].variants[0].sku)
      .and('contain.text', responseMock.products[0].variants[0].hgCode)
      .and(
        'contain.text',
        new Date(responseMock.products[0].variants[0].createdAt).toLocaleDateString('en-GB'),
      )
      .and('contain.text', 'Published')
  }

  it('allows to search by name', () => {
    const phrase = 'americano'
    cy.visit(TestUrls.getSearchPageUrl())
    cy.intercept(
      'GET',
      TestUrls.getApiSearchUrl(SearchQueryParameters.productName, phrase),
      (req) => {
        req.reply(200, emptyResponse)
      },
    ).as('search')
    searchPage.searchByProductName(phrase)
    cy.wait('@search')
  })

  it('allows to search by SKU', () => {
    const sku = 'UK0001'
    cy.visit(TestUrls.getSearchPageUrl())
    cy.intercept('GET', TestUrls.getApiSearchUrl(SearchQueryParameters.sku, sku), (req) => {
      req.reply(200, emptyResponse)
    }).as('search')
    searchPage.searchBySku(sku)
    cy.wait('@search')
  })

  it('allows to search by Hamilton Grant ID', () => {
    const hgCode = 'FP0000001'
    cy.visit(TestUrls.getSearchPageUrl())
    cy.intercept('GET', TestUrls.getApiSearchUrl(SearchQueryParameters.hgCode, hgCode), (req) => {
      req.reply(200, emptyResponse)
    }).as('search')
    searchPage.searchByHamiltonGrant(hgCode)
    cy.wait('@search')
  })

  it('displays results with data, enters product, gets back to search results', () => {
    const resultsQuantity = 5
    const responseMock = getSearchResultsMock(resultsQuantity)
    const searchPhrase = 'test phrase'
    cy.visit(TestUrls.getSearchPageUrl())

    cy.intercept(
      'GET',
      TestUrls.getApiSearchUrl(SearchQueryParameters.productName, searchPhrase),
      (req) => {
        req.reply(200, responseMock)
      },
    ).as('search')
    searchPage.searchByProductName(searchPhrase)
    cy.wait('@search')

    verifySearchResults(responseMock, resultsQuantity)

    // navigate to product
    searchPage.tableRow(responseMock.products[0].name['en-GB']).contains('a').click()

    //create a product
    const variant = new ProductVariantDtoMockBuilder()
      .asMaster()
      .withSku(responseMock.products[0].sku)
      .build()

    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const response = new ProductResponseDtoMockBuilder().setProduct(product).build()

    // navigate to product group page
    cy.interceptProductResponse(response).as('productResponse')
    cy.visit(TestUrls.getProductUrl(responseMock.products[0].sku))
    cy.wait('@productResponse')

    // click back to search
    productMenuCategorisationPage.backToSearchButton().click()
    cy.visit(TestUrls.getSearchPageUrl(SearchQueryParameters.productName, searchPhrase))

    searchPage.searchResultsHeader().should('exist')

    verifySearchResults(responseMock, resultsQuantity)
  })
})
