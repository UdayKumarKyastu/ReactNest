import { render } from '@testing-library/react'
import Section from './Section'

describe('Section', () => {
  it('displays arrow and children properly', () => {
    const childTestId = 'test-child'
    const { getByTestId } = render(
      <Section showArrow>
        <span data-testid={childTestId} />
      </Section>,
    )

    expect(getByTestId(childTestId)).toBeTruthy()
    expect(getByTestId('arrow-right')).toBeTruthy()
  })

  it('respects css props', () => {
    const { container } = render(
      <Section isHidden marginTop>
        <span />
      </Section>,
    )
    expect(container.firstChild).toHaveStyle('display: none')
    expect(container.firstChild).toHaveStyle('margin-top: 2rem')
  })
})
