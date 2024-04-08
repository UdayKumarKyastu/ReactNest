import React from 'react'
import { SectionValueStyles } from './SectionValue.styles'

const { Label, Value } = SectionValueStyles

interface Props {
  label: string
  value: string | JSX.Element
}

const SectionValue = ({ label, value }: Props) => {
  return (
    <>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </>
  )
}

export default SectionValue
