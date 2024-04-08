import { FC, useMemo } from 'react'
import { useTable, Column, Row, Cell, HeaderGroup, CellProps } from 'react-table'
import { VariantsTableStyles } from './VariantsTable.styles'
import { ProductBadge } from '../ProductBadge/ProductBadge'
import { Translation } from '../../../i18n/Translation'
import { LiveStatus } from '../../model/live-status'

const { TableWrapper, TableBody, TableHeader, TableRow, TableHeaderCell, TableCell } =
  VariantsTableStyles

export namespace VariantsTable {
  export interface Variant {
    name: string
    sku: string
    status: LiveStatus
    isMaster: boolean
  }

  export interface Props {
    data: Variant[]
    onRowClick?: (sku: string) => void
  }
}

export const VariantsTable: FC<VariantsTable.Props> = ({ data, onRowClick }) => {
  const { translate } = Translation.useTranslation()

  const columns: Column<VariantsTable.Variant>[] = useMemo(
    () => [
      {
        Header: translate('productPage.fields.variantName'),
        accessor: 'name',
      },
      {
        Header: translate('product.skuLabel'),
        accessor: 'sku',
      },
      {
        Header: translate('product.type'),
        accessor: 'isMaster',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<VariantsTable.Variant, boolean>) => {
          return props.cell.value ? <ProductBadge.MasterVariant /> : <ProductBadge.Variant />
        },
      },
      {
        Header: translate('product.status'),
        accessor: 'status',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<VariantsTable.Variant, LiveStatus>) => {
          switch (props.cell.value) {
            case LiveStatus.ACTIVE:
              return <ProductBadge.Active />
            case LiveStatus.INACTIVE:
              return <ProductBadge.Inactive />
            default:
              return null
          }
        },
      },
    ],
    [translate],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<VariantsTable.Variant>({ columns, data })

  return (
    <TableWrapper {...getTableProps()} data-cy="variants-table">
      <TableHeader>
        {headerGroups.map((headerGroup: HeaderGroup<VariantsTable.Variant>) => {
          const { key, role } = headerGroup.getHeaderGroupProps()

          return (
            <TableRow key={key} role={role}>
              {headerGroup.headers.map((column: HeaderGroup<VariantsTable.Variant>) => {
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
        {rows.map((row: Row<VariantsTable.Variant>) => {
          prepareRow(row)
          const { key, role } = row.getRowProps()

          return (
            <TableRow
              key={key}
              role={role}
              onClick={() => onRowClick?.(row.original.sku)}
              data-testid="variant-table-row"
            >
              {row.cells.map((cell: Cell<VariantsTable.Variant>) => {
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
  )
}
