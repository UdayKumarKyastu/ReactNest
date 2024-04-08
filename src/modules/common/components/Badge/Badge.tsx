import React from 'react'
import { BadgeStyles } from './Badge.styles'

const { Root } = BadgeStyles

interface Props {
  label: string
  color?: 'green' | 'red' | 'black' | 'yellow'
}

const Badge = ({ label, color = 'green' }: Props) => {
  return <Root className={`badge ${color}`}>{label}</Root>
}

export default Badge
