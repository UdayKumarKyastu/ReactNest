import * as Sentry from '@sentry/react'

export const initSentry = () => {
  if (!process.env.SENTRY_DSN || !process.env.BUILD_VERSION) {
    return
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.ENVIRONMENT,
    release: process.env.BUILD_VERSION,
    tracesSampleRate: 1.0,
  })
}
