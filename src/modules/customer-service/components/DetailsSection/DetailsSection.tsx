import React from 'react'
import { DetailsSectionStyles } from './DetailsSection.styles'
import SectionHeader from './SectionHeader/SectionHeader'

const { Wrapper, Separator } = DetailsSectionStyles

interface Props {
  title: string
  children: JSX.Element | (JSX.Element | boolean)[]
  actions?: {
    label: string
    callback(): void
    testSelector?: string
  }[]
}

const DetailsSection = ({ title, children, actions }: Props) => {
  return (
    <Wrapper className="details-section">
      <SectionHeader title={title} actions={actions} />

      {!Array.isArray(children)
        ? children
        : children.map((child, index) => (
            <React.Fragment key={`${title}-${index}`}>
              {child}
              {index !== children.length - 1 && <Separator />}
            </React.Fragment>
          ))}
    </Wrapper>
  )
}

export default DetailsSection
