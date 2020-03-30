# @diegoh/healthcheck

[![Build Status](https://travis-ci.com/diegoh/health-handler.svg?token=$TRAVIS_TOKEN&branch=master)](https://travis-ci.com/diegoh/health-handler)

This is a koa handler for adding a `/healthcheck` endpoint to an API

## Unit Tests

`npm run test:unit`

`npm run test:coverage`

## Lint

`npm run lint` or `npm run lint-fix` to automatically fix any linting issues.

### CI/CD

This project uses GitHub actions for CI/CD. Config files are stored in `.github/workflows`.
The following secrets are required to publish this package.

| name                 | description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `NPM_TOKEN`          | Token to publish the package to npm                            |
| `NPM_PUBLISH_EMAIL`  | Email used for npm credentials                                 |
| `SNYK_TOKEN`         | Snyk API key for security scans                                |
| `GCLOUD_PROJECT_ID`  | Google Cloud project ID (not name) to publish docker images to |
| `GCLOUD_REGION`      | Region to publish docker images to                             |
| `GCLOUD_SERVICE_KEY` | Google Cloud service account's key                             |

## Development

1. Create a new branch from `master` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request (PR).
3. Request a code review.
4. **Squash merge** your commits and keep things tidy.
