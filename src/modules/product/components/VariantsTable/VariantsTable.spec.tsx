import { fireEvent, render } from '@testing-library/react'
import { VariantsTable } from './VariantsTable'
import { LiveStatus } from '../../model/live-status'

const mockedData: VariantsTable.Variant[] = [
  {
    name: 'Americano',
    sku: 'UK004106',
    status: LiveStatus.ACTIVE,
    isMaster: true,
  },
  {
    name: 'Americano with semi-skimmed milk',
    sku: 'UK1234567',
    isMaster: false,
    status: LiveStatus.INACTIVE,
  },
]

describe('Variants table', () => {
  it('should render data passed through props', () => {
    const { getByText } = render(<VariantsTable data={mockedData} />)

    expect(getByText('Americano')).toBeInTheDocument()
    expect(getByText('Americano with semi-skimmed milk')).toBeInTheDocument()
  })

  it('should render proper component if table cell is customized', () => {
    const { getByText } = render(<VariantsTable data={mockedData} />)

    expect(getByText('Master Variant')).toBeInTheDocument()
    expect(getByText('Active')).toBeInTheDocument()
  })

  it('should execute onRowClick function', () => {
    const onRowClick = jest.fn()
    const { getByText } = render(<VariantsTable data={mockedData} onRowClick={onRowClick} />)

    fireEvent.click(getByText('Americano'))

    expect(onRowClick).toHaveBeenLastCalledWith('UK004106')
  })
})
