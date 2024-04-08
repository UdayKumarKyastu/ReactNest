import { ProductEditState } from './ProductEditState'
import { act, renderHook } from '@testing-library/react-hooks'

describe('ProductEditState', () => {
  describe('State reducer', () => {
    it.each`
      action                          | resultState
      ${'USER_REQUEST_EDIT'}          | ${'during-edit'}
      ${'USER_REQUEST_DISCARD_EDIT'}  | ${'during-edit-discarding'}
      ${'USER_CONFIRM_DISCARD_EDIT'}  | ${'initial'}
      ${'USER_CANCEL_DISCARD_EDIT'}   | ${'during-edit'}
      ${'USER_REQUEST_SAVE_CHANGES'}  | ${'during-edit-confirming'}
      ${'USER_CONFIRM_SAVE_CHANGES'}  | ${'during-api-submitting'}
      ${'USER_CANCEL_SAVE_CHANGES'}   | ${'during-edit'}
      ${'SET_API_SUBMITTING'}         | ${'during-api-submitting'}
      ${'SET_API_SUBMITTING_SUCCESS'} | ${'after-edit-successful'}
      ${'SET_API_SUBMITTING_FAIL'}    | ${'after-edit-failed'}
    `(
      'After $action results with state type $resultState',
      ({
        action,
        resultState,
      }: {
        action: ProductEditState.Action['type']
        resultState: ProductEditState.AllStates['type']
      }) => {
        expect(
          ProductEditState.reducer(
            {
              type: 'initial',
            },
            {
              type: action,
            } as ProductEditState.Action,
          ),
        ).toMatchObject({
          type: resultState,
        })
      },
    )
  })

  describe('useState hook', () => {
    let hookResult = renderHook(() => ProductEditState.useState(), {
      wrapper: ProductEditState.Provider,
    })

    beforeEach(() => {
      hookResult = renderHook(() => ProductEditState.useState(), {
        wrapper: ProductEditState.Provider,
      })
    })

    it('Provides initial state and action functions', () => {
      expect(hookResult.result.current.state.type).toBe('initial')

      Object.values(hookResult.result.current.action).forEach((action) =>
        expect(action).toBeInstanceOf(Function),
      )
    })

    it('Changes state after action dispatched', () => {
      expect(hookResult.result.current.state.type).toBe('initial')

      act(() => {
        hookResult.result.current.action.userRequestEdit()
      })

      expect(hookResult.result.current.state.type).toBe('during-edit')
    })

    it('Detect when edit confirmation modal should be visible', () => {
      expect(hookResult.result.current.state.type).toBe('initial')

      act(() => {
        hookResult.result.current.action.userRequestSaveChanges()
      })

      expect(hookResult.result.current.selector.isEditConfirmModalOpen).toBe(true)

      act(() => {
        hookResult.result.current.action.setApiSubmitting()
      })

      expect(hookResult.result.current.selector.isEditConfirmModalOpen).toBe(true)
    })
  })
})
