import { ProductBadgeStyles } from './ProductBadge.styles'
import { Translation } from '../../../i18n/Translation'
import { HTMLAttributes } from 'react'

export declare namespace ProductBadge {
  export type Variant = 'dark-red' | 'red' | 'blue' | 'green' | 'pink' | 'yellow'

  export type BaseProps = HTMLAttributes<HTMLSpanElement>

  export type DefaultProps = BaseProps & {
    variant: Variant
  }

  export type ActiveProps = BaseProps &
    (
      | {}
      | {
          active: number
          of: number
        }
    )
}

const { Wrapper } = ProductBadgeStyles

const Default = ({ variant, children, ...props }: ProductBadge.DefaultProps) => {
  return (
    <Wrapper variant={variant} {...props}>
      {children}
    </Wrapper>
  )
}

export const AllVariants = (props: ProductBadge.BaseProps) => {
  const { translate } = Translation.useTranslation()

  return (
    <Default variant="blue" {...props}>
      {translate('productBadge.allVariants')}
    </Default>
  )
}

export const MasterVariant = (props: ProductBadge.BaseProps) => {
  const { translate } = Translation.useTranslation()

  return (
    <Default variant="red" {...props}>
      {translate('common.masterVariant')}
    </Default>
  )
}

export const Inactive = (props: ProductBadge.BaseProps) => {
  const { translate } = Translation.useTranslation()

  return (
    <Default variant="pink" {...props}>
      {translate('productBadge.inactive')}
    </Default>
  )
}

export const Blocked = (props: ProductBadge.BaseProps) => {
  const { translate } = Translation.useTranslation()

  return (
    <Default variant="pink" {...props}>
      {translate('productBadge.blocked')}
    </Default>
  )
}

export const Legacy = (props: ProductBadge.BaseProps) => {
  const { translate } = Translation.useTranslation()

  return (
    <Default variant="dark-red" {...props}>
      {translate('productBadge.legacy')}
    </Default>
  )
}

export const Variant = (props: ProductBadge.BaseProps) => {
  const { translate } = Translation.useTranslation()

  return (
    <Default variant="yellow" {...props}>
      {translate('common.variant')}
    </Default>
  )
}

export const Active = (props: ProductBadge.ActiveProps) => {
  const { translate } = Translation.useTranslation()

  const renderActiveCount = () => {
    if ('active' in props && 'of' in props) {
      return `${props.active}/${props.of} `
    }

    return null
  }

  return (
    <Default variant="green" {...props}>
      {renderActiveCount()}
      {translate('productBadge.active')}
    </Default>
  )
}

export const ProductBadge = {
  Default,
  MasterVariant,
  AllVariants,
  Active,
  Variant,
  Inactive,
  Blocked,
  Legacy,
}
