import React from 'react'
import { SectionHeaderStyles } from './SectionHeader.styles'

const { Root, Title, TitleUnderline, TitleWrapper, ActionsWrapper, ActionButton } =
  SectionHeaderStyles

interface Props {
  title: string
  actions?: {
    label: string
    callback(): void
    styleType?: string
    testSelector?: string
  }[]
}

const SectionHeader = ({ title, actions }: Props) => {
  return (
    <Root>
      <TitleWrapper>
        <Title>{title}</Title>

        <ActionsWrapper>
          {actions?.map((action, index) => (
            <ActionButton
              key={`${action.label}-${index}`}
              compact
              styleType={action.styleType || 'secondary'}
              onClick={action.callback}
              data-testid={action.testSelector}
              icon={null}
            >
              {action.label}
            </ActionButton>
          ))}
        </ActionsWrapper>
      </TitleWrapper>

      <TitleUnderline />
    </Root>
  )
}

export default SectionHeader
