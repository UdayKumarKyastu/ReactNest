/**
 * TODO:
 *  - type props based on docs
 *  - type the library itself
 */
declare module '@pretamanger/component-library' {
  import { ComponentType, ReactNode } from 'react'

  export declare const Chevron: ComponentType<any>
  export declare const Dropdown: ComponentType<Dropdown.Props>
  export declare const Input: ComponentType<any>
  export declare const TextArea: ComponentType<any>
  export declare const LoadingIndicator: ComponentType<any> & {
    Off: ComponentType<any>
    On: ComponentType<any>
  }
  export declare const Search: ComponentType<any>
  export declare const Confirmation: ComponentType<any>
  export declare const Cross: ComponentType<any>
  export declare const Star: ComponentType<any>
  export declare const Button: ComponentType<Button.Props>
  export declare const Checkbox: ComponentType<Checkbox.Props>
  export declare const Modal: ComponentType<Modal.Props>
  export declare const Table: ComponentType<Table.Props>
  export declare const Notice: ComponentType<Notice.Props>
  export declare const Alert: ComponentType<Alert.Props>
  export declare const AccordionContainer: ComponentType<AccordionContainer.Props>
  export declare const AccordionItem: ComponentType<AccordionItem.Props>
  export declare const RadioButton: ComponentType<RadioButton.Props>
  export declare const Tooltip: ComponentType<Tooltip.Props>
  export declare const Toast: ComponentType<Toast.Props>

  namespace Button {
    type Props = {
      children?: ReactNode
      compact?: boolean
      disabled?: boolean
      href?: string
      icon?: ReactNode
      onClick?(e: any): void
      styleType?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
      target?: '_self' | '_blank' | '_parent' | '_top'
      type?: 'button' | 'reset' | 'submit'
      activity?: boolean
      complete?: boolean
    } & any
  }

  namespace Table {
    type Props = {
      headings: string[]
      rows: string[][]
      hasRowHeaders?: boolean
      className?: string
    }
  }
  namespace Checkbox {
    type Props = {
      id: string
      label: string
      autoComplete?: string
      error?: string
      helpText?: ReactNode
      hideLabel?: boolean
      name?: string
      required?: boolean
      valid?: boolean
      value?: string
      defaultChecked?: boolean | null
      onChange?: (e: React.ChangeEvent) => void
      isSelected?: boolean | null
      disabled?: boolean
    }
  }

  namespace RadioButton {
    type Props = {
      id: string
      label: node
      name: string
      onChange?: (e: React.ChangeEvent) => void
      disabled?: boolean
      role?: string
      value?: string
      defaultChecked?: boolean
      expanded?: boolean
      controls?: string
    }
  }

  namespace AccordionContainer {
    type Props = {
      children: ReactNode
      title?: ReactNode
    }
  }

  namespace AccordionItem {
    type Props = {
      children: ReactNode
      title: ReactNode
      expanded?: boolean
      onToggle?(): void
    }
  }

  namespace Dropdown {
    type Props = {
      id: string
      label: string | ReactNode
      error?: string | ReactNode
      helpText?: string | ReactNode
      hideLabel?: boolean
      name?: PropTypes.string
      options?: Option[]
      onSelect?: (current: string) => void
      required?: boolean
      requiredText?: string
      current?: string
    }

    type Option = {
      id: string
      value: string
      label?: string
      ariaLabel?: string
    }
  }

  namespace Modal {
    export type Props = {
      onClose(): void
      open: boolean
      children: ReactNode
      description?: string
      showCloseButton?: boolean
      closeOnEscape?: boolean
      closeButtonLabel?: string
      size?: 'narrow' | 'standard' | 'wide'
    }
  }

  namespace Notice {
    export type Props = {
      title: ReactNode
      variant: 'success' | 'info' | 'warning' | 'critical'
      description?: ReactNode
    }
  }

  namespace Alert {
    export type Props = SVGProps
  }

  namespace Tooltip {
    export type Props = {
      text: string
      children: JSX.Element
    }
  }

  namespace Toast {
    export type ToastVariant = 'success' | 'info' | 'warning' | 'critical'

    export type Props = {
      title: ReactNode
      description?: ReactNode
      variant?: ToastVariant
      timeout?: number
      toastKey?: string
    }
  }
}
