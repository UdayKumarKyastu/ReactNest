import { render } from '@testing-library/react'
import AcceptRejectButtons from './AcceptRejectButtons'
import { ChangeStatus } from '../../model/review-status'

const PENDING_STATUS_REVIEW_MOCK = { status: ChangeStatus.Pending }
const SKUS_MOCK = { masterSku: 'sku123' }
const NOT_AUTHORIZED_TRANSLATION = 'Not authorized!'
const APPROVED_TRANSLATION = 'Approved'
const REJECTED_TRANSLATION = 'Rejected'

jest.mock('../../../i18n/Translation', () => {
  return {
    Translation: {
      useTranslation() {
        return {
          translate(key: string) {
            return {
              'productAllDraftChangesPage.notAuthorized': NOT_AUTHORIZED_TRANSLATION,
              'productAllDraftChangesPage.accepted': APPROVED_TRANSLATION,
              'productAllDraftChangesPage.rejected': REJECTED_TRANSLATION,
            }[key]
          },
        }
      },
    },
  }
})

describe('AcceptRejectButtons', () => {
  it('no permissions', () => {
    const { getByText, getByTestId } = render(
      <AcceptRejectButtons
        changeStatus={PENDING_STATUS_REVIEW_MOCK}
        canApproveChanges={false}
        fieldName={'name1'}
        resourceSkus={SKUS_MOCK}
        tabName="marketing"
      />,
    )
    expect(getByTestId('approve-button')).toBeDisabled()
    expect(getByTestId('reject-button')).toBeDisabled()
    expect(getByText(NOT_AUTHORIZED_TRANSLATION)).toBeTruthy()
  })

  it('pending status', () => {
    const { getByTestId } = render(
      <AcceptRejectButtons
        changeStatus={PENDING_STATUS_REVIEW_MOCK}
        canApproveChanges={true}
        fieldName={'name1'}
        resourceSkus={SKUS_MOCK}
        tabName="marketing"
      />,
    )
    expect(getByTestId('approve-button')).not.toBeDisabled()
    expect(getByTestId('reject-button')).not.toBeDisabled()
  })

  it('accepted status', () => {
    const ACCEPTED_STATUS_REVIEW_MOCK = {
      status: ChangeStatus.Accepted,
      modifiedAt: '2020-02-02 20:30',
    }
    const { getByTestId, getByText } = render(
      <AcceptRejectButtons
        changeStatus={ACCEPTED_STATUS_REVIEW_MOCK}
        canApproveChanges={true}
        fieldName={'name1'}
        resourceSkus={SKUS_MOCK}
        tabName="marketing"
      />,
    )
    expect(getByTestId('reset-button')).toBeTruthy()
    expect(getByText(APPROVED_TRANSLATION)).toBeTruthy()
  })

  it('rejected status', () => {
    const REJECTED_STATUS_REVIEW_MOCK = {
      status: ChangeStatus.Rejected,
      modifiedAt: '2020-02-02 20:30',
    }
    const { getByTestId, getByText } = render(
      <AcceptRejectButtons
        changeStatus={REJECTED_STATUS_REVIEW_MOCK}
        canApproveChanges={true}
        fieldName={'name1'}
        resourceSkus={SKUS_MOCK}
        tabName="marketing"
      />,
    )
    expect(getByTestId('reset-button')).toBeTruthy()
    expect(getByText(REJECTED_TRANSLATION)).toBeTruthy()
  })
})
