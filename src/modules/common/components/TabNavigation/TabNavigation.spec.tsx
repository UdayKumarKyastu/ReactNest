import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter } from 'react-router-dom'
import { TabNavigation } from './TabNavigation'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

const navItems = [
  {
    label: 'Master marketing',
    href: 'master-marketing',
    isActive: true,
  },
  {
    label: 'Delivery website',
    href: 'delivery-website',
    isActive: false,
  },
]

describe('Navigation', () => {
  let history = createMemoryHistory({
    initialEntries: ['/'],
  })
  jest.spyOn(history, 'push')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render items supplied through props', () => {
    const { getByText } = render(
      <BrowserRouter>
        <TabNavigation items={navItems} />
      </BrowserRouter>,
    )

    expect(getByText('Master marketing')).toBeInTheDocument()
    expect(getByText('Delivery website')).toBeInTheDocument()
  })

  it('should navigate to correct route on item click', () => {
    const { getByText } = render(
      <BrowserRouter>
        <TabNavigation items={navItems} />
      </BrowserRouter>,
    )

    const navLink = getByText('Delivery website')
    fireEvent.click(navLink)

    expect(window.location.pathname).toContain(`delivery-website`)
  })
})
