import { fireEvent, render } from '@testing-library/react'
import { Dropdown } from './Dropdown'

describe('Dropdown', () => {
  const options: { key: string; label: string }[] = [
    { key: 'chocolate', label: 'Chocolate' },
    { key: 'strawberry', label: 'Strawberry' },
    { key: 'vanilla', label: 'Vanilla' },
  ]

  const props: Dropdown.Props = {
    id: 'dropdown',
    label: 'testLabel',
    placeholder: 'Select',
  }

  it('should open options list on input click', () => {
    const { getByText, getByLabelText } = render(<Dropdown options={options} {...props} />)

    fireEvent.click(getByLabelText(props.label!), () => {
      options.forEach((option) => {
        expect(getByText(option.label)).toBeInTheDocument()
      })
    })
  })

  it('should update input value on option click', () => {
    const { getByDisplayValue, getByText, getByLabelText } = render(
      <Dropdown options={options} {...props} />,
    )

    const optionToClick = options[0].label

    fireEvent.click(getByLabelText(props.label!), () => {
      fireEvent.click(getByText(optionToClick), () => {
        expect(getByDisplayValue(optionToClick)).toBeInTheDocument()
      })
    })
  })

  it('should display value if passed through props', () => {
    const { getByText } = render(<Dropdown value={options[1]} options={options} {...props} />)

    expect(getByText(options[1].label)).toBeInTheDocument()
  })

  it('should allow user to choose multiple options is isMulti prop is passed', async () => {
    const { getByLabelText, getByText } = render(<Dropdown options={options} isMulti {...props} />)

    fireEvent.click(getByLabelText(props.label!), () => {
      fireEvent.click(getByText(options[0].label))
      expect(getByText(options[0].label)).toBeInTheDocument()
    })
    fireEvent.click(getByLabelText(props.label!), () => {
      fireEvent.click(getByText(options[2].label))
      expect(getByText(options[0].label)).toBeInTheDocument()
      expect(getByText(options[2].label)).toBeInTheDocument()
    })
  })

  it('should allow user to filter options', () => {
    const { getAllByText, getByLabelText, queryByText } = render(
      <Dropdown options={options} {...props} />,
    )

    fireEvent.click(getByLabelText(props.label!))
    fireEvent.change(getByLabelText(props.label!), {
      target: { value: options[0].label },
    })

    expect(getAllByText(options[0].label)).toHaveLength(2)
    expect(queryByText(options[1].label)).not.toBeInTheDocument()
    expect(queryByText(options[2].label)).not.toBeInTheDocument()
  })

  it('should allow user to filter options', () => {
    const onChange = jest.fn()
    const { getByLabelText, getByText } = render(
      <Dropdown options={options} onChange={onChange} {...props} />,
    )

    fireEvent.click(getByLabelText(props.label!), () => {
      fireEvent.click(getByText(options[2].label))
      expect(onChange).toHaveBeenCalledWith([options[2]])
    })
  })
})
