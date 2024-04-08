import { fireEvent, render } from '@testing-library/react'
import { UnsavedDataNotice, Props } from './UnsavedDataNotice'
import { AppProvider, withEditState } from '../../../app-provider'
import { ProductDtoMockBuilder } from '../../../modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from '../../../modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from '../../../modules/product/mock/product-variant-dto-mock-builder'
import { ProductDtoMapper } from '../../../modules/product/model/ProductDtoMapper'

const masterSku = 'UK123'
const variantSku = 'UK123'
const version = 1

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ masterSku, variantSku, version }),
}))

const baseVariant = new ProductVariantDtoMockBuilder()
  .asMaster()
  .withSku(masterSku)
  .withHamiltonGrant({ productCode: variantSku })
  .build()

const product = new ProductDtoMockBuilder().addVariant(baseVariant).build()
const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()

const initialProduct = ProductDtoMapper.singleToProduct(productResponse)

describe('UnsavedDataNotice', () => {
  const onSave = jest.fn()

  it('displays proper message with action buttons', () => {
    const { getByText, getByTestId } = render(
      <AppProvider providers={[withEditState]} initialProduct={initialProduct}>
        <UnsavedDataNotice tab="marketing" onSave={onSave} />
      </AppProvider>,
    )

    expect(getByText('This tab has unsaved data')).toBeInTheDocument()
    expect(getByTestId('save-unsaved-data')).toBeInTheDocument()
    expect(getByTestId('update-unsaved-data')).toBeInTheDocument()
  })

  it('allows to save duplicated data', () => {
    const { getByTestId } = render(
      <AppProvider providers={[withEditState]} initialProduct={initialProduct}>
        <UnsavedDataNotice tab="marketing" onSave={onSave} />
      </AppProvider>,
    )

    fireEvent.click(getByTestId('save-unsaved-data'), () => {
      expect(onSave).toHaveBeenCalled()
    })
  })

  it('allows to edit version data', () => {
    const { getByText, getByTestId } = render(
      <AppProvider providers={[withEditState]} initialProduct={initialProduct}>
        <UnsavedDataNotice tab="marketing" onSave={onSave} />
      </AppProvider>,
    )

    fireEvent.click(getByTestId('update-unsaved-data'), () => {
      expect(getByTestId('cross-button')).toBeInTheDocument()
      expect(getByTestId('cancel-button')).toBeInTheDocument()
      expect(getByTestId('save-button')).toBeInTheDocument()
      expect(getByText('This tab has unsaved data')).not.toBeInTheDocument()
    })
  })

  describe('displays proper tab name in warning', () => {
    const tabs: Props['tab'][] = ['marketing', 'reporting', 'labelling', 'attributes', 'pricing']

    it.each(tabs)('should display %tab in warning', (tab) => {
      const { getByText } = render(
        <AppProvider providers={[withEditState]} initialProduct={initialProduct}>
          <UnsavedDataNotice tab={tab} onSave={onSave} />
        </AppProvider>,
      )

      expect(
        getByText(
          "All marketing data has been duplicated from the current version of this product. If this data is correct please select 'save duplicated data'. Data that is duplicated does not require reviewing or approval. If this data needs to be updated please select 'update data'. Data this is updated will be held in draft until reviewed by an approver.",
          { exact: false },
        ),
      ).toBeInTheDocument()
    })
  })
})
