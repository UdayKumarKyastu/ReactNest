import React from 'react'
import { NotificationsState } from '../../state/NotificationsState'
import { Toast } from '@pretamanger/component-library'

const NotificationsProvider = () => {
  const { state } = NotificationsState.useState()

  if (!state?.title) {
    return null
  }

  return <Toast variant={state?.variant} title={state?.title} description={state?.message} />
}

export default NotificationsProvider
