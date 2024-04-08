# Cypress tests

We now have Cypress tests that can either run against the actual external services or mock all of them out and test the UI without any external dependencies.

### How to run locally

First of all, make sure your local web solution is up and running (on localhost:3000). Then, execute:

```
npm run cypress:run
```

This will run all the tests that sit under the [cypress/integration](integration) folder.

Alternatively, if you want to see the tests in action on a browser window and be able to interact with the dev tools, step through the test steps, etc., then execute:

```
npm run cypress:open
```

This will open a Cypress app, where you will see a list of your tests. You can choose to run any test, which will then start your browser and run the test. This is a great way to see the tests in action and debug.

### Cypress config

We have a config file (cypress.json) where you can configure pretty much any setting you want in Cypress. For more info, see https://docs.cypress.io/guides/references/configuration.html.

Cypress can record a video of the test runs, which then gets saved under [cypress/videos](videos). You can configure whether you want a video or not in the config file. It also takes screenshots of failing tests, which you can find under [cypress/screenshots](screenshots).

### How to run tests against mocked services

To run the tests against mocked services, execute:

```
npm run test:integration
```

This script, in a nutshell, prepares and starts the mock servers (more details below), run the tests, and then cleans up after itself.
