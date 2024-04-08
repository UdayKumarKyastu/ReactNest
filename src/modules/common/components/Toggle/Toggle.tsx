import { ChangeEvent } from 'react'
import { ToggleStyles } from './Toggle.styles'

export declare namespace Toggle {
  export type Props = {
    id: string
    label: string
    name: string
    value: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
  }
}

const { Label, Wrapper, HiddenCheckbox, Line, Dot } = ToggleStyles

export const Toggle = ({ id, label, name, value, onChange, disabled = false }: Toggle.Props) => {
  return (
    <Label htmlFor={id}>
      <span>{label}</span>
      <Wrapper>
        <HiddenCheckbox
          id={id}
          name={name}
          checked={value}
          onChange={onChange}
          type="checkbox"
          disabled={disabled}
        />
        <Line />
        <Dot />
      </Wrapper>
    </Label>
  )
}
