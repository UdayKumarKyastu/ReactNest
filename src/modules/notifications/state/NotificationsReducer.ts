import { NotificationsState } from './NotificationsState'
import { NOTIFICATIONS_ACTIONS } from './actions'

export const NotificationsReducer = (
  state: NotificationsState.State,
  action: NotificationsState.Action,
) => {
  const type = action.type

  switch (type) {
    case NOTIFICATIONS_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
