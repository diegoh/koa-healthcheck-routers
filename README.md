# @diegoh/healthcheck

![Build](https://github.com/diegoh/healthcheck/workflows/Test/badge.svg)

This module exports a `HealthCheck` and a `HeartBeat` router.

## HealthCheck

Checks each of the URLs provided, if they all return an OK status code (`200`) the response will be `200 OK`.
If any of the services fails to respond, the response will be unhealthy;`500 Internal Server Error`.

HealthChecks require an array of urls. See the example below.

## HeartBeat

This is a cheap and shallow check for the API itself.
If the API is up and running the endpoint will return `200 OK`.

## Example

```js
import * as Koa from 'koa';

import { HealthCheckRouter, HeartBeatRouter } from '../../src/index';

const urls = [
  new URL('http://localhost:11111/healthcheck'),
  new URL('http://localhost:22222/healthcheck'),
  new URL('http://localhost:33333/healthcheck')
];

const app = new Koa();
const healthcheck = new HealthCheckRouter(urls);
const heartbeat = new HeartBeatRouter();

app.use(healthcheck.routes());
app.use(healthcheck.allowedMethods());
app.use(heartbeat.routes());
app.use(heartbeat.allowedMethods());

http.createServer(app.callback()).listen(3000);
```

## Development

1. Create a new branch from `master` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request (PR).
3. Request a code review.
4. **Squash merge** your commits and keep things tidy.

Make sure all tests add value and are passing.

## Testing

### Unit

`npm run test:unit`

### Coverage

`npm run test:coverage`

### Integration

`npm run test:integration`

## Lint

`npm run lint` or `npm run lint-fix` to automatically fix any linting issues.

### CI/CD

This project uses GitHub actions for CI/CD. Config files are stored in `.github/workflows`.
The following secrets are required to publish this package.

| name                | description                         |
| ------------------- | ----------------------------------- |
| `NPM_TOKEN`         | Token to publish the package to npm |
| `NPM_PUBLISH_EMAIL` | Email used for npm credentials      |
