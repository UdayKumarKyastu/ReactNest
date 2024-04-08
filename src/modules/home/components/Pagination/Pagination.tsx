import { FC, useMemo } from 'react'
import { Dropdown } from '../../../common/components/Dropdown/Dropdown'
import { PaginationStyles } from './Pagination.styles'
import { Translation } from '../../../i18n/Translation'
import { ArrowRight } from '../../../../icons/ArrowRight'
import { ArrowLeft } from '../../../../icons/ArrowLeft'

export declare namespace Pagination {
  export type Props = {
    pageCount: number
    pageIndex: number
    goToPage: (pageIndex: number) => void
    canPreviousPage: boolean
    canNextPage: boolean
    setPageSize?: (rowsCount: number) => void
    pageSize?: number
  }
}

const { PaginationWrapper, DropdownWrapper, ControlsWrapper, Control, PagesCount } =
  PaginationStyles

export const Pagination: FC<Pagination.Props> = ({
  pageIndex,
  goToPage,
  canPreviousPage,
  canNextPage,
  setPageSize,
  pageCount = 1,
  pageSize = 10,
}) => {
  const { translate } = Translation.useTranslation()
  const pageCountOptions = useMemo(
    () =>
      [...Array(pageCount).keys()].map((key) => ({
        key: key,
        label: (key + 1).toString(),
      })),
    [pageCount],
  )

  const perPageOptions = useMemo(
    () =>
      [10, 20, 30, 40, 50].map((count) => ({
        key: count,
        label: count.toString(),
      })),
    [],
  )

  const handlePageChange = (pageIndex: number) => {
    goToPage(pageIndex)
  }

  const handleRowsPerPageChange = (pagesCount: number) => {
    setPageSize?.(pagesCount)
  }

  return (
    <PaginationWrapper>
      <DropdownWrapper data-cy="products-per-page-wrapper">
        <Dropdown
          id=""
          label={`${translate('productNotifications.productsPerPage')}:`}
          value={{ key: pageSize, label: pageSize.toString() }}
          options={perPageOptions}
          onChange={(option: { key: string; label: string }) => {
            handleRowsPerPageChange(Number(option.key))
          }}
        />
      </DropdownWrapper>
      <ControlsWrapper>
        <Control
          onClick={() => handlePageChange(0)}
          disabled={!canPreviousPage}
          data-testid="firstPageButton"
          aria-label={translate('pagination.firstPage')}
        >
          <ArrowLeft />
          <ArrowLeft />
        </Control>

        <Control
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={!canPreviousPage}
          data-testid="previousPageButton"
          aria-label={translate('pagination.previousPage')}
        >
          <ArrowLeft />
        </Control>

        <DropdownWrapper>
          <Dropdown
            id="currentPage"
            data-testId="currentPage"
            label={`${translate('productNotifications.page')}:`}
            value={{ key: pageIndex, label: (pageIndex + 1).toString() }}
            options={pageCountOptions}
            onChange={(option: { key: string; label: string }) => {
              handlePageChange(Number(option.key))
            }}
          />
        </DropdownWrapper>

        <PagesCount>
          {translate('productNotifications.of')} {pageCount}
        </PagesCount>

        <Control
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={!canNextPage}
          data-testid="nextPageButton"
          aria-label={translate('pagination.nextPage')}
        >
          <ArrowRight />
        </Control>

        <Control
          onClick={() => handlePageChange(pageCount - 1)}
          disabled={!canNextPage}
          data-testid="lastPageButton"
          aria-label={translate('pagination.lastPage')}
        >
          <ArrowRight />
          <ArrowRight />
        </Control>
      </ControlsWrapper>
    </PaginationWrapper>
  )
}
