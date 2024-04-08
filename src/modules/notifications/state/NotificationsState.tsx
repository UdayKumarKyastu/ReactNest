import { createContext, useContext, useMemo, useReducer } from 'react'
import { NOTIFICATIONS_ACTIONS } from './actions'
import { NotificationsReducer } from './NotificationsReducer'
import NotificationsProvider from '../components/NotificationsProvider/NotificationsProvider'

export declare namespace NotificationsState {
  export interface Props {
    children: JSX.Element | JSX.Element[]
  }

  export type State = {
    variant: 'success' | 'info' | 'warning' | 'critical'
    title: string
    message: string
  } | null

  type Action = {
    type: typeof NOTIFICATIONS_ACTIONS.ADD_NOTIFICATION
    payload: {
      title: string
      message: string
      variant: 'success' | 'info' | 'warning' | 'critical'
    }
  }

  export interface Context {
    state: State | null
    actions: {
      addNotification(
        title: string,
        message: string,
        variant: 'success' | 'info' | 'warning' | 'critical',
      ): void
    }
  }
}

const Context = createContext<NotificationsState.Context>({
  state: null,
  actions: null as unknown as NotificationsState.Context['actions'],
})

const Provider = ({ children }: NotificationsState.Props) => {
  const [state, dispatch] = useReducer(NotificationsReducer, null)

  const actions: NotificationsState.Context['actions'] = useMemo(() => {
    return {
      addNotification(
        title: string,
        message: string,
        variant: 'success' | 'info' | 'warning' | 'critical',
      ) {
        dispatch({
          type: NOTIFICATIONS_ACTIONS.ADD_NOTIFICATION,
          payload: { title, message, variant },
        })
      },
    }
  }, [])

  return (
    <Context.Provider value={{ state, actions }}>
      <NotificationsProvider />
      {children}
    </Context.Provider>
  )
}

const useNotificationsState = () => {
  const { actions, state } = useContext(Context)

  return {
    actions,
    state,
  }
}

export const NotificationsState = {
  Provider,
  useState: useNotificationsState,
}
