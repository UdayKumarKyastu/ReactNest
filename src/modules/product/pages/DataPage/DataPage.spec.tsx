import { fireEvent, render } from '@testing-library/react'
import { DataPage } from './DataPage'
import { AppProvider } from '../../../../app-provider'
import { ProductDtoMockBuilder } from '../../../../modules/product/mock/product-dto-mock-builder'
import { ProductResponseDtoMockBuilder } from '../../../../modules/product/mock/product-response-dto-mock-builder'
import { ProductVariantDtoMockBuilder } from '../../../../modules/product/mock/product-variant-dto-mock-builder'
import { ProductDtoMapper } from '../../../../modules/product/model/ProductDtoMapper'

const baseVariant = new ProductVariantDtoMockBuilder().asMaster().withSku('123').build()

const product = new ProductDtoMockBuilder().addVariant(baseVariant).build()
const productResponse = new ProductResponseDtoMockBuilder().setProduct(product).build()

const initialProduct = ProductDtoMapper.singleToProduct(productResponse)

describe('DataPage', () => {
  const commonProps: DataPage.Props = {
    editView: <div>Edit view</div>,
    readonlyView: <div>Readonly view</div>,
    sideBySideView: <div>Side by side view</div>,
    title: 'Data page title',
    hasChanges: false,
  }

  it('should display readonly view if there are no changes', () => {
    const { queryByText } = render(<DataPage {...commonProps} hasChanges={false} />)
    expect(queryByText('Readonly view')).toBeInTheDocument()
    expect(queryByText('Edit view')).not.toBeInTheDocument()
    expect(queryByText('Side by side view')).not.toBeInTheDocument()
  })

  it('should display side by side view if changes exist', () => {
    const { queryByText } = render(<DataPage {...commonProps} hasChanges={true} />)
    expect(queryByText('Side by side view')).toBeInTheDocument()
    expect(queryByText('Readonly view')).not.toBeInTheDocument()
    expect(queryByText('Edit view')).not.toBeInTheDocument()
  })

  it('should display edit view on edit button click', () => {
    const { queryByText, getByTestId } = render(
      <AppProvider providers={[]} initialProduct={initialProduct}>
        <DataPage {...commonProps} hasChanges={false} />
      </AppProvider>,
    )

    expect(queryByText('Readonly view')).toBeInTheDocument()
    const editButton = getByTestId('edit-button')
    fireEvent.click(editButton, () => {
      expect(queryByText('Edit view')).toBeInTheDocument()

      const discardButton = getByTestId('cross-button')

      fireEvent.click(discardButton, () => {
        expect(queryByText('Readonly view')).toBeInTheDocument()
      })
    })
  })

  it('should not display edit button if hideEditButton prop is set to true', () => {
    const { queryByTestId } = render(
      <DataPage {...commonProps} hasChanges={false} hideEditButton={true} />,
    )
    expect(queryByTestId('edit-button')).not.toBeInTheDocument()
  })

  it('should not display edit button if product is unpublished', () => {
    initialProduct.published = false
    const { queryByTestId } = render(
      <AppProvider providers={[]} initialProduct={initialProduct}>
        <DataPage {...commonProps} hasChanges={false} />
      </AppProvider>,
    )

    expect(queryByTestId('edit-button')).not.toBeInTheDocument()
  })

  it('should display edit button for future version even if product is unpublished', () => {
    initialProduct.published = false
    const { queryByTestId } = render(
      <AppProvider providers={[]} initialProduct={initialProduct}>
        <DataPage {...commonProps} hasChanges={false} isFutureVersion />
      </AppProvider>,
    )

    expect(queryByTestId('edit-button')).toBeInTheDocument()
  })
})
