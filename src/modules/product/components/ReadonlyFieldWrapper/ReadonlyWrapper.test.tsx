import { render } from '@testing-library/react'
import ReadonlyFieldWrapper from './ReadonlyFieldWrapper'

describe('ReadonlyWrapper', () => {
  it('renders arrow', () => {
    const { getByTestId } = render(<ReadonlyFieldWrapper showArrow={true} />)

    expect(getByTestId('change-icon')).toBeInTheDocument()
  })

  it('renders arrow', () => {
    const MOCK = 'text1'
    const { getByText } = render(
      <ReadonlyFieldWrapper presentChange={true}>{MOCK}</ReadonlyFieldWrapper>,
    )

    expect(getByText(MOCK)).toHaveStyle('background-color: rgb(249 250 251)')
  })
})
