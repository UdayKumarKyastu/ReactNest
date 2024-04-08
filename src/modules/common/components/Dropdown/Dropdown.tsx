import { FC, useCallback, ReactElement } from 'react'
import Select, {
  StylesConfig,
  components,
  OptionProps,
  ValueType,
  GroupTypeBase,
} from 'react-select'
import { DropdownStyles } from './Dropdown.styles'
import { Checkbox } from '@pretamanger/component-library'
import { SelectComponents } from 'react-select/src/components'

export declare namespace Dropdown {
  export interface Props {
    id: string
    label?: string
    options?: Option[]
    onChange?(value: Value | Value[]): void
    placeholder?: string
    value?: Value
    isMulti?: boolean
    disabled?: boolean
    isClearable?: boolean
    customExternalComponents?:
      | Partial<SelectComponents<any, boolean, GroupTypeBase<Dropdown.Option>>>
      | undefined
  }

  export interface Option {
    label: string | ReactElement
    key?: string | number
    value?: string | number
  }

  export type Value = ValueType<Option, IsMulti>

  export type IsMulti = boolean
}

const { SelectWrapper } = DropdownStyles

const customStyles: StylesConfig<Dropdown.Option, Dropdown.IsMulti> = {
  container: (provided) => ({
    ...provided,
    border: '1px solid #575354',
  }),
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    color: '#575354',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(167, 145, 95, .5)' : 'none',
    borderRadius: 'none',
  }),
  option: (provided) => ({
    ...provided,
    color: '#575354',
    background: 'transparent',
    fontWeight: 'normal',
    span: {
      color: '#575354',
    },
    '&:hover': {
      background: '#FBEFF1',

      polygon: {
        fill: '#F6F4F5',
      },
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid #575354',
    borderRadius: 'none',
    fontSize: '16px',
    boxShadow: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    svg: {
      fill: '#404040',
      stroke: '#404040',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#575354',
  }),
}

const CustomOption: FC<OptionProps<Dropdown.Option, Dropdown.IsMulti>> = (props) => {
  const { isSelected, label, data } = props

  return (
    <components.Option {...props}>
      <Checkbox defaultChecked={isSelected} label={label} id={data.value} />
    </components.Option>
  )
}

export const Dropdown: FC<Dropdown.Props> = ({
  id,
  label,
  options,
  placeholder,
  onChange,
  value,
  isMulti = false,
  disabled = false,
  isClearable = false,
  customExternalComponents,
}) => {
  const customComponents = isMulti ? { Option: CustomOption } : {}

  const handleChange = useCallback(
    (value: Dropdown.Value) => {
      onChange?.(value)
    },
    [onChange],
  )

  const mapOption = (option: Dropdown.Option) => ({ value: option.key, label: option.label })

  return (
    <SelectWrapper>
      <label htmlFor={id}>{label}</label>
      <Select
        //TODO: fix ts issue
        value={isMulti ? (value as any)?.map(mapOption) : value}
        label={label}
        aria-label={label || 'no-label'}
        onChange={(option) => handleChange(option)}
        options={isMulti ? options?.map(mapOption) : options}
        styles={customStyles}
        isMulti={isMulti}
        hideSelectedOptions={false}
        components={customExternalComponents || customComponents}
        placeholder={placeholder}
        classNamePrefix="select"
        isDisabled={disabled}
        isClearable={isClearable}
        menuPlacement="auto"
      />
    </SelectWrapper>
  )
}
