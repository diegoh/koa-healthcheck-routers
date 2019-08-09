# @diegoh/healthcheck

[![Build Status](https://travis-ci.com/diegoh/health-handler.svg?token=$TRAVIS_TOKEN&branch=master)](https://travis-ci.com/diegoh/health-handler)

This is a koa handler for adding a `/healthcheck` endpoint to an API

## Development

1. Create a new branch from `master` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request (PR).
3. Request a code review.
4. **Squash merge** your commits and keep things tidy.

## Unit Tests

`npm run test:unit`

`npm run test:coverage`

## Lint

`npm run lint` or `npm run lint-fix` to automatically fix any linting issues.

## CI

This project uses Travis CI.

Add `NPM_TOKEN` and `NPM_PUBLISH_EMAIL` and `SNYK_TOKEN` as secrets to travis settings for each repo.
