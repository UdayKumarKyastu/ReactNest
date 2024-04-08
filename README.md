# Pret Portal UI

Welcome to Pret Portal UI!

### Prerequisite

- Node (>= 18.17.0)
- An `.npmrc` file in your home directory containing `@pretamanger:registry=https://npm.pkg.github.com/pretamanger` AND `//npm.pkg.github.com/:_authToken=<AUTH_TOKEN>`. Replace `<AUTH_TOKEN>` with a [Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with the correct scope for installing packages from the @pretamanger package repository. Check out the [example .npmrc](./.npmrc.template).

##Config

This web app uses [dotenv](https://www.npmjs.com/package/dotenv) to read config from a `.env` file.

##### Config fields and their descriptions

| Name                     | Type   | Description                     | Usage | Sensitive |
| ------------------------ | ------ | ------------------------------- | ----- | --------- |
| `AUTH0_CLIENT_ID`        | string | Auth0 client ID for the web SPA | SSR   |           |
| `AUTH0_DOMAIN`           | string | Auth0 domain for the web SPA    | SSR   |           |
| `AUTH0_AUDIENCE`         | string | Auth0 audience for the web SPA  | SSR   |           |
| `PORTAL_API`             | string | Portal API URL                  | SSR   |           |
| `REACT_APP_TURN_OFF_PDD` | string | To hide PDD link                | SSR   |           |

### Installing and running

<em>Optional:</em> Use the correct version of node (using NVM)

```
nvm use
```

Install the package dependencies

```
npm install
```

Then you can run the project locally

```
npm run dev
```
