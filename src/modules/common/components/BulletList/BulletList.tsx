import React from 'react'
import { BulletListStyles } from './BulletList.styles'

const { Wrapper } = BulletListStyles

export declare namespace BulletList {
  export type Props = {
    items: string[]
  }
}

export const BulletList = ({ items }: BulletList.Props) => {
  return (
    <Wrapper>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Wrapper>
  )
}
