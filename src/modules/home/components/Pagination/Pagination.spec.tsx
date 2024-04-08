import { fireEvent, render } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  const defaultProps = {
    canPreviousPage: true,
    canNextPage: true,
    pageCount: 10,
    goToPage: jest.fn(),
    changeRowsPerPage: jest.fn(),
  }

  it('displays proper current page and total number of pages', () => {
    const { getByText } = render(<Pagination pageIndex={2} {...defaultProps} />)

    expect(getByText('3')).toBeInTheDocument()
    expect(getByText(`of ${defaultProps.pageCount}`)).toBeInTheDocument()
  })

  it('changes page to next on right arrow click', () => {
    const { getByTestId, getByText } = render(<Pagination pageIndex={4} {...defaultProps} />)

    const nextPageButton = getByTestId('nextPageButton')

    fireEvent.click(nextPageButton)

    expect(defaultProps.goToPage).toHaveBeenCalledWith(5)
    expect(getByText('5')).toBeInTheDocument()
  })

  it('changes page to last on double right arrow click', () => {
    const { getByTestId, getByText } = render(<Pagination pageIndex={4} {...defaultProps} />)

    const lastPageButton = getByTestId('lastPageButton')

    fireEvent.click(lastPageButton)

    expect(defaultProps.goToPage).toHaveBeenCalledWith(9)
    expect(getByText('10')).toBeInTheDocument()
  })

  it('changes page to previous on left arrow click', () => {
    const { getByTestId, getByText } = render(<Pagination pageIndex={4} {...defaultProps} />)

    const previousPageButton = getByTestId('previousPageButton')

    fireEvent.click(previousPageButton, () => {
      expect(defaultProps.goToPage).toHaveBeenCalledWith(3)
      expect(getByText('4')).toBeInTheDocument()
    })
  })

  it('changes page to first on double left arrow click', () => {
    const { getByTestId, getByText } = render(<Pagination pageIndex={4} {...defaultProps} />)

    const firstPageButton = getByTestId('firstPageButton')

    fireEvent.click(firstPageButton, () => {
      expect(defaultProps.goToPage).toHaveBeenCalledWith(1)
      expect(getByText('1')).toBeInTheDocument()
    })
  })

  it('changes page to page index selected from dropdown', () => {
    const { getByText, getByLabelText, getByDisplayValue } = render(
      <Pagination pageIndex={4} {...defaultProps} />,
    )

    const pagesDropdown = getByLabelText('Page:')

    fireEvent.click(pagesDropdown)

    fireEvent.click(pagesDropdown, () => {
      fireEvent.click(getByText('9'), () => {
        expect(defaultProps.goToPage).toHaveBeenCalledWith(9)
        expect(getByDisplayValue('9')).toBeInTheDocument()
      })
    })
  })

  it('changes rows per page count', () => {
    const { getByText, getByLabelText, getByDisplayValue } = render(
      <Pagination pageIndex={4} {...defaultProps} />,
    )

    const rowsPerPageDropdown = getByLabelText('Products per page:')

    fireEvent.click(rowsPerPageDropdown)

    fireEvent.click(rowsPerPageDropdown, () => {
      fireEvent.click(getByText('50'), () => {
        expect(defaultProps.goToPage).toHaveBeenCalledWith(50)
        expect(getByDisplayValue('50')).toBeInTheDocument()
      })
    })
  })
})
