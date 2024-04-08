import { render } from '@testing-library/react'
import InfoTooltip from './InfoTooltip'

describe('InfoTooltip', () => {
  it('should show a tooltip with the provided text', () => {
    const testText = 'A work of art'
    const { queryByText } = render(<InfoTooltip text={testText} />)

    expect(queryByText(testText)).toBeInTheDocument()
  })
})
