import { Input } from '@pretamanger/component-library'
import React, { useCallback, useEffect, useState } from 'react'
import { MaskedInputStyles } from './MaskedInput.styles'

const { Wrapper, Prefix } = MaskedInputStyles

interface Props {
  onChange?: (value: string) => void
  value?: string
  type?: string
  mask?: RegExp
  disabled?: boolean
  className?: string
  label?: string
  prefix?: string
  testSelector?: string
  adornment?: string
}

const MaskedInput = ({
  value,
  mask,
  onChange,
  className,
  disabled,
  label,
  prefix,
  testSelector,
  type,
  adornment,
}: Props) => {
  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [innerValue, setInnerValue, value])

  const handleChange = useCallback(
    ({ currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
      const newValue = !mask || mask.test(currentTarget.value) ? currentTarget.value : value
      setInnerValue(newValue)
      onChange?.(newValue!)
    },
    [value, onChange, mask],
  )

  return (
    <Wrapper withPrefix={!!prefix} className={className}>
      {!!prefix && <Prefix>{prefix}</Prefix>}
      <Input
        label={label}
        className={className}
        value={innerValue}
        onChange={handleChange}
        disabled={disabled}
        id={testSelector}
        type={type}
        adornment={adornment}
      />
    </Wrapper>
  )
}

export default MaskedInput
