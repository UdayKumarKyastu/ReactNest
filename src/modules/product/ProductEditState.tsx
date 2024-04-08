import React, { createContext, PropsWithChildren, useContext, useMemo, useReducer } from 'react'

export declare namespace ProductEditState {
  export interface Initial {
    type: 'initial'
  }

  export interface DuringEdit {
    type: 'during-edit'
  }

  export interface DuringEditDiscarding {
    type: 'during-edit-discarding'
  }

  export interface DuringEditConfirming {
    type: 'during-edit-confirming'
  }

  export interface DuringApiSubmitting {
    type: 'during-api-submitting'
  }

  export interface AfterEditSuccessful {
    type: 'after-edit-successful'
  }

  export interface AfterEditFailed {
    type: 'after-edit-failed'
    reason: Error
  }

  export type AllStates =
    | Initial
    | DuringEdit
    | DuringEditDiscarding
    | DuringEditConfirming
    | DuringApiSubmitting
    | AfterEditSuccessful
    | AfterEditFailed

  export type Action =
    | { type: 'USER_REQUEST_EDIT' }
    | { type: 'USER_REQUEST_DISCARD_EDIT' }
    | { type: 'USER_CONFIRM_DISCARD_EDIT' }
    | { type: 'USER_CANCEL_DISCARD_EDIT' }
    | { type: 'USER_REQUEST_SAVE_CHANGES' }
    | { type: 'USER_CANCEL_SAVE_CHANGES' }
    | { type: 'USER_CONFIRM_SAVE_CHANGES' }
    | { type: 'SET_API_SUBMITTING' }
    | { type: 'SET_API_SUBMITTING_SUCCESS' }
    | { type: 'SET_API_SUBMITTING_FAIL'; payload: { error: Error } }

  export type Context = {
    state: AllStates
    action: {
      userRequestEdit(): void

      userRequestDiscardEdit(): void
      userConfirmDiscardEdit(): void
      userCancelDiscardEdit(): void

      userRequestSaveChanges(): void
      userConfirmSaveChanges(): void
      userCancelSaveChanges(): void

      setApiSubmitting(): void
      setApiSubmittingSuccess(): void
      setApiSubmittingFail(error: Error): void
    }
  }
}

const reducer = (
  state: ProductEditState.AllStates,
  action: ProductEditState.Action,
): ProductEditState.AllStates => {
  const type = action.type

  switch (type) {
    case 'USER_REQUEST_EDIT':
      return {
        type: 'during-edit',
      }
    case 'USER_REQUEST_DISCARD_EDIT':
      return {
        type: 'during-edit-discarding',
      }
    case 'USER_CONFIRM_DISCARD_EDIT':
      return {
        type: 'initial',
      }
    case 'USER_CANCEL_DISCARD_EDIT':
      return {
        type: 'during-edit',
      }
    case 'USER_REQUEST_SAVE_CHANGES':
      return {
        type: 'during-edit-confirming',
      }
    case 'USER_CONFIRM_SAVE_CHANGES':
      return {
        type: 'during-api-submitting',
      }
    case 'USER_CANCEL_SAVE_CHANGES':
      return {
        type: 'during-edit',
      }
    case 'SET_API_SUBMITTING':
      return {
        type: 'during-api-submitting',
      }
    case 'SET_API_SUBMITTING_SUCCESS':
      return {
        type: 'after-edit-successful',
      }
    case 'SET_API_SUBMITTING_FAIL':
      return {
        type: 'after-edit-failed',
        reason: 'payload' in action ? action.payload.error : new Error('Error saving changes'),
      }
  }

  return state
}

const Context = createContext<ProductEditState.Context>({
  state: {
    type: 'initial',
  },
  action: null as unknown as ProductEditState.Context['action'],
})

const Provider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, { type: 'initial' })

  const actions: ProductEditState.Context['action'] = useMemo(() => {
    return {
      userRequestEdit() {
        dispatch({ type: 'USER_REQUEST_EDIT' })
      },
      userConfirmDiscardEdit() {
        dispatch({ type: 'USER_CONFIRM_DISCARD_EDIT' })
      },
      userRequestDiscardEdit() {
        dispatch({ type: 'USER_REQUEST_DISCARD_EDIT' })
      },
      userCancelDiscardEdit() {
        dispatch({ type: 'USER_CANCEL_DISCARD_EDIT' })
      },
      userRequestSaveChanges() {
        dispatch({ type: 'USER_REQUEST_SAVE_CHANGES' })
      },
      userCancelSaveChanges() {
        dispatch({ type: 'USER_CANCEL_SAVE_CHANGES' })
      },
      setApiSubmittingFail(error: Error) {
        dispatch({ type: 'SET_API_SUBMITTING_FAIL', payload: { error } })
      },
      setApiSubmittingSuccess() {
        dispatch({ type: 'SET_API_SUBMITTING_SUCCESS' })
      },
      setApiSubmitting() {
        dispatch({ type: 'SET_API_SUBMITTING' })
      },
      userConfirmSaveChanges() {
        dispatch({ type: 'USER_CONFIRM_SAVE_CHANGES' })
      },
    }
  }, [])

  return (
    <Context.Provider
      value={{
        state,
        action: actions,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useProductEditState = () => {
  const { action, state } = useContext(Context)

  return {
    action,
    state,
    selector: {
      isEditConfirmModalOpen:
        state.type === 'during-edit-confirming' || state.type === 'during-api-submitting',
      isAfterEdit: state.type === 'after-edit-failed' || state.type === 'after-edit-successful',
    },
  }
}

export const ProductEditState = {
  Provider,
  useState: useProductEditState,
  reducer,
}
