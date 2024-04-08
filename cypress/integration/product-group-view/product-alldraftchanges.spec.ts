import { getUkCategoriesResponseMock } from 'cypress/fixtures/mocks/categories.mock'
import { countProductChanges } from 'cypress/helpers/util'
import { ProductAllDraftChangesPage } from 'cypress/pages/product-group/ProductAllDraftChangesPage'
import { TestUrls } from 'cypress/support/TestUrls'
import { GetProductDto } from 'src/modules/product/dto/get-product.dto'
import { DraftChangesMockBuilder } from 'src/modules/product/mock/draft-changes-dto-mock-builder'
import {
  ProductDtoMockBuilder,
  ProductSetupEditableForUser,
} from 'src/modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from 'src/modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from 'src/modules/product/mock/product-variant-dto-mock-builder'

describe('Product All draft changes tab', () => {
  const productAllDraftChangesPage = new ProductAllDraftChangesPage()

  const ukCategories = getUkCategoriesResponseMock().categories[0]

  const newProductCategory: GetProductDto.ProductCategoryTree[] = [
    [
      {
        key: ukCategories.key,
        id: ukCategories.categoryID,
        name: ukCategories.categoryName,
      },
      {
        key: ukCategories.categories[0].key,
        id: ukCategories.categories[0].categoryID,
        name: ukCategories.categories[0].categoryName,
      },
      {
        key: ukCategories.categories[0].categories[0].key,
        id: ukCategories.categories[0].categories[0].categoryID,
        name: ukCategories.categories[0].categories[0].categoryName,
      },
    ],
  ]

  const newProductSetup: ProductSetupEditableForUser = {
    iceMachineRequired: true,
    blenderRequired: true,
    canHaveVariants: true,
    canAddSyrup: true,
    canAddExtraCoffeeShot: true,
    canAddWhippedCream: true,
  }

  context('no draft changes for any product variant', () => {
    const sku = 'UK01'
    const variant = new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const responseWoDrafrChanges = new ProductResponseDtoMockBuilder().setProduct(product).build()

    it('messaging is shown explaining that no draft changes are pending', () => {
      cy.interceptProductResponse(responseWoDrafrChanges)
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
      productAllDraftChangesPage.verifyNoDraftChanges()
    })
  })

  context('saved draft changes exist against only 1 product variant', () => {
    const sku = 'UK002'
    const variantIndex = 0
    const variant = new ProductVariantDtoMockBuilder().asMaster().withSku(sku).build()
    const product = new ProductDtoMockBuilder().addVariant(variant).build()
    const draftChanges = new DraftChangesMockBuilder(product)
      .replaceVariantPluReportingName(variantIndex, 'new reporting name')
      .build()
    const response = new ProductResponseDtoMockBuilder()
      .setProduct(product)
      .setDraftChanges(draftChanges)
      .build()

    it('variant draft changes are displayed without accordion', () => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
      cy.wait('@productResponse')

      productAllDraftChangesPage.accordionItem().should('not.exist')
      productAllDraftChangesPage.accordionHeader().should('not.exist')
      productAllDraftChangesPage.verifyVariantDraftChangesData(variantIndex, response)
    })
  })

  context('saved drafts exist only against product group', () => {
    const sku = 'UK003'
    const variant = new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build()
    const product = new ProductDtoMockBuilder().addVariant(variant).setSetup().build()
    const draftChanges = new DraftChangesMockBuilder(product)
      .replaceProductMenuCategory(newProductCategory)
      .replaceProductSetup(newProductSetup)
      .build()
    const response = new ProductResponseDtoMockBuilder()
      .setProduct(product)
      .setDraftChanges(draftChanges)
      .build()

    it('product group draft changes are displayed without accordion', () => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
      cy.wait('@productResponse')

      productAllDraftChangesPage.verifyTotalDraftChangesInfoMessage(
        response.draftChanges.changesCount.total,
      )
      productAllDraftChangesPage.verifyProductDraftChangesData(response)
    })
  })

  context('saved drafts exist against product group and variant', () => {
    const sku = 'UK003'
    const variantIndex = 0
    const variant = new ProductVariantDtoMockBuilder().withSku(sku).asMaster().build()
    const product = new ProductDtoMockBuilder().addVariant(variant).setSetup().build()
    const draftChanges = new DraftChangesMockBuilder(product)
      .replaceProductMenuCategory(newProductCategory)
      .replaceProductSetup(newProductSetup)
      .replaceVariantPluReportingName(variantIndex, 'new test variant plu name')
      .build()
    const response = new ProductResponseDtoMockBuilder()
      .setProduct(product)
      .setDraftChanges(draftChanges)
      .build()

    it('product group and master variant that contains draft values are listed in a collapsed accordions', () => {
      cy.interceptProductResponse(response).as('productResponse')
      cy.visit(TestUrls.getProductAllDraftChangesUrl(sku))
      cy.wait('@productResponse')

      const expectedDraftChangesQuantity = countProductChanges(response)

      productAllDraftChangesPage.verifyTotalDraftChangesInfoMessage(expectedDraftChangesQuantity)

      productAllDraftChangesPage
        .productGroupAccordionHeader()
        .should('be.visible')
        .and('contain.text', 'All Product IDs')
        .and('contain.text', 'All Product SKUs')
      productAllDraftChangesPage
        .accordionHeaderOfVariant(productAllDraftChangesPage.texts.masterVariant)
        .should('be.visible')
        .and('contain.text', variant.sku)

      productAllDraftChangesPage.productGroupAccordionHeader().click()
      productAllDraftChangesPage.verifyProductDraftChangesData(response)
      productAllDraftChangesPage.accordionHeaderOfVariant(variant.sku).click()
      productAllDraftChangesPage.verifyVariantDraftChangesData(variantIndex, response)
    })
  })

  context('saved draft changes exist for multiple product variants', () => {
    const masterSku = 'UK01'
    const variantsData = [
      {
        name: 'Master Variant 1',
        sku: masterSku,
      },
      {
        name: 'Variant 2',
        sku: 'UK02',
      },
      {
        name: 'Variant 3',
        sku: 'UK03',
      },
    ]

    const draftAttributes: GetProductDto.BaristaVariantAttributes = {
      withDecafPods: true,
      withOatMilk: true,
      withRiceCoconutMilk: true,
      withSemiSkimmedMilk: true,
      withSkimmedMilk: true,
      withSoyMilk: true,
      withoutMilk: true,
    }

    const draftName: GetProductDto.ProductVariant['name'] = {
      'en-US': 'Test draft name-en-US',
      'en-GB': 'Test draft name-en-GB',
      'zh-HK': '',
      'en-HK': '',
      'fr-FR': '',
    }

    const draftDescription: GetProductDto.ProductVariant['description']['standard'] = {
      'en-US': 'Test draft description-en-US',
      'en-GB': 'Test draft description-en-GB',
      'zh-HK': '',
      'en-HK': '',
      'fr-FR': 'Test brouillon descriptif-fr-Fr',
    }

    const variant1 = new ProductVariantDtoMockBuilder()
      .withName(variantsData[0].name)
      .withSku(variantsData[0].sku)
      .withAttributes()
      .asMaster()
      .build()
    const variant2 = new ProductVariantDtoMockBuilder()
      .withName(variantsData[1].name)
      .withSku(variantsData[1].sku)
      .withAttributes()
      .build()
    const variant3 = new ProductVariantDtoMockBuilder()
      .withName(variantsData[2].name)
      .withSku(variantsData[2].sku)
      .withAttributes()
      .build()

    const product = new ProductDtoMockBuilder()
      .setSetup()
      .addVariants([variant1, variant2, variant3])
      .build()
    const draftChanges = new DraftChangesMockBuilder(product)
      .replaceVariantName(0, draftName)
      .replaceVariantName(1, draftName)
      .replaceVariantDescription(0, draftDescription)
      .replaceVariantPluReportingName(0, 'Variant 1 - New draft PLU reporting name')
      .replaceVariantAttributes(0, draftAttributes)
      .build()
    const draftResponse = new ProductResponseDtoMockBuilder()
      .setProduct(product)
      .setDraftChanges(draftChanges)
      .build()

    beforeEach(() => {
      cy.interceptProductResponse(draftResponse).as('productResponse')
      cy.visit(TestUrls.getProductAllDraftChangesUrl(masterSku))
      cy.wait('@productResponse')
    })

    it('all product variants in the product group that contain draft values are listed in a collapsed accordions', () => {
      // first two variants contains draft values
      productAllDraftChangesPage.accordionItemOfVariant(variant1.name['en-GB']).should('be.visible')
      productAllDraftChangesPage.accordionItemOfVariant(variant2.name['en-GB']).should('be.visible')
      productAllDraftChangesPage.accordionItem().should('have.length', 2)
      cy.contains(variant3.name['en-GB']).should('not.exist')

      productAllDraftChangesPage
        .changesCellOfVariant(draftResponse.product.variants[0].name['en-GB'])
        .should('have.text', draftResponse.draftChanges.variants[0].changesCount.total)
      productAllDraftChangesPage
        .changesCellOfVariant(draftResponse.product.variants[1].name['en-GB'])
        .should('have.text', draftResponse.draftChanges.variants[1].changesCount.total)

      productAllDraftChangesPage.draftLeftColumn().should('be.hidden')
      productAllDraftChangesPage.draftRightColumn().should('be.hidden')

      const expectedAmountOfChanges = countProductChanges(draftResponse)
      productAllDraftChangesPage.verifyTotalDraftChangesInfoMessage(expectedAmountOfChanges)
    })

    it('clicking Product variant accordion reveals the draft changes for that variant', () => {
      productAllDraftChangesPage
        .accordionHeaderOfVariant(draftResponse.product.variants[0].name['en-GB'])
        .scrollIntoView()
        .click()
      // TODO: changes in all sections
      // productAllDraftChangesPage.verifyAllSectionsAreVisible()
      productAllDraftChangesPage.verifyVariantDraftChangesData(0, draftResponse)
      productAllDraftChangesPage
        .accordionHeaderOfVariant(draftResponse.product.variants[0].name['en-GB'])
        .scrollIntoView()
        .click()

      productAllDraftChangesPage.draftLeftColumn().should('be.hidden')
      productAllDraftChangesPage.draftRightColumn().should('be.hidden')
    })

    it('approving draft changes sends proper request and displays confirmation messaging', () => {
      const responseWoDraft = new ProductResponseDtoMockBuilder()
        .setProduct(
          new ProductDtoMockBuilder()
            .addVariant(new ProductVariantDtoMockBuilder().withSku(masterSku).asMaster().build())
            .build(),
        )
        .build()

      cy.intercept(
        'POST',
        TestUrls.getApiProductAllDraftChangesApprovalUrl(masterSku),
        (request) => {
          request.reply(200)
        },
      ).as('approval')

      cy.interceptProductResponse(responseWoDraft).as('savedProductResponse')

      productAllDraftChangesPage.approveAllChanges()

      // this asserts proper approval request was sent
      cy.wait('@approval')
      cy.wait('@savedProductResponse')

      const expectedAmountOfChanges = countProductChanges(draftResponse)
      productAllDraftChangesPage.verifySuccesSavedDraftChanges(expectedAmountOfChanges)
    })
  })
})
