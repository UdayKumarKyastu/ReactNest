require('dotenv').config()

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  config.env.PORTAL_API = process.env.PORTAL_API

  // https://github.com/archfz/cypress-terminal-report
  require('cypress-terminal-report/src/installLogsPrinter')(on)

  return config
}
