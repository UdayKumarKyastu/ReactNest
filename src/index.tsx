import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { initSentry } from './modules/errors/utils/sentry'
import AppWrapper from './app-wrapper'

initSentry()

ReactDOM.render(
  <Router>
    <AppWrapper />
  </Router>,
  document.getElementById('app'),
)
