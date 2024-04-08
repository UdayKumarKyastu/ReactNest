import { fireEvent, render } from '@testing-library/react'
import { Datepicker } from './Datepicker'

describe('Datepicker', () => {
  it('should show calendar on input click', () => {
    const { getByTestId, getByText } = render(
      <Datepicker id="testId" label="testLabel" value={new Date(2021, 5, 23)} locale="en-GB" />,
    )

    const dateInput = getByTestId('testId')
    fireEvent.click(dateInput)

    expect(getByText('June')).toBeInTheDocument()
    expect(getByText('2021')).toBeInTheDocument()
  })

  it('should update input value and close calendar on day click', () => {
    const { getByTestId, getByText, getByDisplayValue } = render(
      <Datepicker id="testId" label="testLabel" value="20/06/2021" />,
    )

    const dateInput = getByTestId('testId')
    fireEvent.click(dateInput)

    const calendarHeader = getByText('June')
    expect(calendarHeader).toBeInTheDocument()

    fireEvent.click(getByText('23'), () => {
      expect(getByDisplayValue('23/06/2021')).toBeInTheDocument()

      expect(calendarHeader).not.toBeInTheDocument()
    })
  })

  it('should display date in locale based format', () => {
    const value = new Date(2021, 5, 20)
    const { getByDisplayValue } = render(
      <Datepicker id="testId" label="testLabel" value={value} locale="en-GB" />,
    )

    expect(getByDisplayValue('20/06/2021')).toBeInTheDocument()
  })

  it('should call onChange function with proper argument', () => {
    const onChange = jest.fn()
    const { getByTestId, getByText } = render(
      <Datepicker
        id="testId"
        label="testLabel"
        value="10/06/2021"
        format="dd/MM/yyyy"
        onChange={onChange}
      />,
    )

    const dateInput = getByTestId('testId')
    fireEvent.click(dateInput)

    fireEvent.click(getByText('23'))

    expect(onChange).toHaveBeenCalled()
  })

  it('should hide calendar when user clicks outside', () => {
    const onChange = jest.fn()
    const { getByTestId, getByText } = render(
      <Datepicker
        id="testId"
        label="testLabel"
        value="10/06/2021"
        format="dd/MM/yyyy"
        onChange={onChange}
      />,
    )

    const dateInput = getByTestId('testId')
    fireEvent.click(dateInput)
    const calendar = getByText('June')
    expect(calendar).toBeInTheDocument()
    fireEvent.click(document, () => {
      expect(calendar).not.toBeInTheDocument()
    })
  })

  it('should change months on arrows click', () => {
    const onChange = jest.fn()
    const { getByTestId, getByText } = render(
      <Datepicker
        id="testId"
        label="testLabel"
        value="10/06/2021"
        format="dd/MM/yyyy"
        onChange={onChange}
      />,
    )

    const dateInput = getByTestId('testId')
    fireEvent.click(dateInput)

    const nextArrow = getByTestId('datepicker-arrow-next')
    const previousArrow = getByTestId('datepicker-arrow-previous')

    fireEvent.click(nextArrow, () => {
      expect(getByText('July')).toBeInTheDocument()
    })

    fireEvent.click(previousArrow)
    fireEvent.click(previousArrow, () => {
      expect(getByText('May')).toBeInTheDocument()
    })
  })
})
