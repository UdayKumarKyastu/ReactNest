import { Fragment, PropsWithChildren, useMemo } from 'react'
import { useTable, usePagination, useExpanded, TableOptions } from 'react-table'
import { ProductsTableStyles } from './ProductsTable.styles'
import { Pagination } from '../../components/Pagination/Pagination'
import { useSearchState } from '../../../../modules/search/state/search.state'

const { TableWrapper, TableBody, TableHeader, TableRow, TableHeaderCell, TableCell } =
  ProductsTableStyles

export namespace ProductsTable {
  export interface TableProperties<T extends Record<string, unknown>> extends TableOptions<T> {}
}

export const ProductsTable = <T extends Record<string, unknown>>(
  props: PropsWithChildren<ProductsTable.TableProperties<T>>,
) => {
  const { data, columns, manualPagination } = props
  const { propertyName } = useSearchState()

  const initialTableState = useMemo(() => {
    return propertyName !== 'name'
      ? { expanded: { '0': true } as Record<string, boolean> }
      : undefined
  }, [propertyName])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      paginateExpandedRows: false,
      initialState: initialTableState,
      manualPagination,
    },
    useExpanded,
    usePagination,
  )

  return (
    <Fragment>
      <TableWrapper {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => {
            const { key, role } = headerGroup.getHeaderGroupProps()

            return (
              <TableRow key={key} role={role} cellsNumber={headerGroup.headers.length}>
                {headerGroup.headers.map((column) => {
                  const { key, role } = column.getHeaderProps()

                  return (
                    <TableHeaderCell key={key} role={role}>
                      {column.render('Header')}
                    </TableHeaderCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            const { key, role } = row.getRowProps()

            return (
              <TableRow
                key={key}
                role={role}
                marginLeft={`${row.depth * 1.5}rem`}
                isExpanded={row.isExpanded}
                cellsNumber={row.cells.length}
                data-testid={key}
              >
                {row.cells.map((cell) => {
                  const { key, role } = cell.getCellProps()

                  return (
                    <TableCell key={key} role={role}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </TableWrapper>
      {!manualPagination && (
        <Pagination
          pageCount={pageCount}
          goToPage={gotoPage}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageSize={pageSize}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
        />
      )}
    </Fragment>
  )
}
