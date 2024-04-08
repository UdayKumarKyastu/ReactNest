import { render } from '@testing-library/react'
import MultiLangChanges from './MultiLangChanges'
import { ChangeStatus } from '../../model/review-status'
import { LocaleMock } from '../../../i18n/LocaleMock'

const REVIEW_STATUSES_MOCK = {
  'en-GB': { status: ChangeStatus.Pending },
  'en-HK': { status: ChangeStatus.Pending },
  'en-US': { status: ChangeStatus.Pending },
  'en-FR': { status: ChangeStatus.Pending },
  'fr-FR': { status: ChangeStatus.Pending },
  'zh-HK': undefined,
}
const mockValue = LocaleMock.createMultiLangMock('value')

describe('MultiLangChanges component', () => {
  it('displays only active rows', () => {
    const { container } = render(
      <MultiLangChanges
        value={mockValue}
        fieldName={'name1'}
        reviewStatuses={REVIEW_STATUSES_MOCK}
      />,
    )
    const rows = container.querySelectorAll('[data-cy=lang-row]')
    expect(rows).toHaveLength(5)
  })

  it('displays proper data in row', () => {
    const REVIEW_STATUS_MOCK = {
      'en-GB': { status: ChangeStatus.Pending },
    }
    const { getByText } = render(
      <MultiLangChanges
        value={mockValue}
        fieldName={'name1'}
        reviewStatuses={REVIEW_STATUS_MOCK}
      />,
    )
    expect(getByText('EN-GB')).toBeTruthy()
    expect(getByText('value-en-GB')).toBeTruthy()
  })
})
