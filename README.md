# @diegoh/healthcheck

![Build](https://github.com/diegoh/healthcheck/workflows/Build/badge.svg)

This module exports a `HealthCheck` and a `HeartBeat` router.

## HealthCheck

Provides a router with a single `GET /healthcheck` endpoint.
Requires an array of URLs to check as configuration.

It checks each of the URLs provided, when all services return a `200 OK` status code the `/healthcheck` response will be `200 OK`. This means the service and underlying services are healthy.

If any of the services fails to respond, or returns **any status code other than `200`**, the response for this endpoint will be `500 Internal Server Error`.

## HeartBeat

This is a cheap and shallow check for the current service itself, it does not check any underlying services.
If the service is up and running the endpoint will return `200 OK`. No response, or `500 Internal Server Error` means the service is down.

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
2. Push the branch and open a Pull Request.
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

`npm run lint` or `npm run lint:fix` to automatically fix any linting issues.
