import React, { HTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import tw, { styled } from 'twin.macro'
import { SideBySideTableStyles } from './SideBySideTable.styles'

const { Row, TableWrapper, ColumnWrapper } = SideBySideTableStyles

export declare namespace SideBySideTable {
  export type Props = PropsWithChildren<{}>

  export type RowProps = {
    children: [ReactNode, ReactNode]
  }

  export type ColumnProps = PropsWithChildren<{ noBorder?: boolean }>

  export type SectionHeadlineProps = HTMLAttributes<HTMLHeadingElement> & {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    marginTop?: boolean
  }
}

export const SideBySideTable = (props: SideBySideTable.Props) => {
  return <TableWrapper>{props.children}</TableWrapper>
}

export const SideBySideTableRow = (props: SideBySideTable.RowProps) => {
  return (
    <Row>
      <ColumnWrapper data-cy="draft-left-column">{props.children[0]}</ColumnWrapper>
      <ColumnWrapper data-cy="draft-right-column">{props.children[1]}</ColumnWrapper>
    </Row>
  )
}

export const SideBySideTableColumn = (props: SideBySideTable.ColumnProps) => {
  return (
    <div style={{ borderBottomColor: props.noBorder ? 'transparent' : '#E7E4E4' }}>
      {props.children}
    </div>
  )
}

export const TableSectionHeadline = ({
  tag = 'h4',
  marginTop = true,
  ...props
}: SideBySideTable.SectionHeadlineProps) => {
  const StyledHeadline = styled(tag)`
    ${tw`font-normal text-sm text-grey-700`}
    margin-bottom: 10px;
    ${marginTop && tw`mt-3`}
  `

  return <StyledHeadline {...props} />
}
