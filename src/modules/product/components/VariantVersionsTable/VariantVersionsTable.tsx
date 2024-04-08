import { FC, useMemo } from 'react'
import { useTable, Column, Row, Cell, HeaderGroup, CellProps } from 'react-table'
import { Cross, Confirmation } from '@pretamanger/component-library'
import { VariantVersionsTableStyles } from './VariantVersionsTable.styles'
import { Translation } from '../../../i18n/Translation'
import { VariantVersionPublishState } from '../../model/variant-version-publish-state'
import { Version as VersionIcon } from '../../../../icons/Version'

const {
  TableWrapper,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  CellWithIcon,
  CrossIconWrapper,
} = VariantVersionsTableStyles

export namespace VariantVersionsTable {
  export interface Version {
    name: string
    sku: string
    liveFrom: string
    status: boolean
    publishState: VariantVersionPublishState
    hamiltonGrantID: string
    version: React.ReactElement
  }

  export interface Props {
    data: Version[]
    onRowClick?: (versionId: string, publishState: VariantVersionPublishState) => void
    withGrayBackground?: boolean
  }
}

export const VariantVersionsTable: FC<VariantVersionsTable.Props> = ({
  data,
  onRowClick,
  withGrayBackground,
}) => {
  const { translate } = Translation.useTranslation()

  const columns: Column<VariantVersionsTable.Version>[] = useMemo(
    () => [
      {
        Header: translate('variantVersionsPage.version'),
        accessor: 'version',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<VariantVersionsTable.Version, string>) => {
          return (
            <CellWithIcon data-cy="version-number-cell">
              <VersionIcon />
              {props.cell.value}
            </CellWithIcon>
          )
        },
      },
      {
        Header: translate('variantVersionsPage.productName'),
        accessor: 'name',
      },
      {
        Header: translate('variantVersionsPage.hamiltonGrantID'),
        accessor: 'hamiltonGrantID',
      },
      {
        Header: translate('variantVersionsPage.productSku'),
        accessor: 'sku',
      },
      {
        Header: translate('variantVersionsPage.liveFrom'),
        accessor: 'liveFrom',
      },
      {
        Header: translate('variantVersionsPage.status'),
        accessor: 'status',
        // eslint-disable-next-line react/display-name
        Cell: (props: CellProps<VariantVersionsTable.Version, string>) => {
          if (props.cell.value) {
            return (
              <CellWithIcon>
                <Confirmation width="14px" height="14px" />
                {translate('variantVersionsPage.published')}
              </CellWithIcon>
            )
          } else {
            return (
              <CellWithIcon>
                <CrossIconWrapper>
                  <Cross colour="white" width="6px" height="6px" />
                </CrossIconWrapper>
                {translate('variantVersionsPage.unpublished')}
              </CellWithIcon>
            )
          }
        },
      },
    ],
    [translate],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<VariantVersionsTable.Version>({ columns, data })

  return (
    <TableWrapper {...getTableProps()} data-cy="versions-table">
      <TableHeader>
        {headerGroups.map((headerGroup: HeaderGroup<VariantVersionsTable.Version>) => {
          const { key, role } = headerGroup.getHeaderGroupProps()

          return (
            <TableRow key={key} role={role}>
              {headerGroup.headers.map((column: HeaderGroup<VariantVersionsTable.Version>) => {
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
      <TableBody {...getTableBodyProps()} withGrayBackground={withGrayBackground}>
        {rows.map((row: Row<VariantVersionsTable.Version>) => {
          prepareRow(row)
          const { key, role } = row.getRowProps()

          return (
            <TableRow
              key={key}
              role={role}
              onClick={() =>
                onRowClick?.(
                  row.original.version.props.children.toString(),
                  row.original.publishState,
                )
              }
            >
              {row.cells.map((cell: Cell<VariantVersionsTable.Version>) => {
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
