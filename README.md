# @diegoh/koa-healthcheck-routers

![Build](https://github.com/diegoh/koa-healthcheck-routers/workflows/Build/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Package Version](https://img.shields.io/npm/v/@diegoh/koa-healthcheck-routers)

This module exports 2 [`@koa/router`](https://github.com/koajs/router) routers.

## 1. Deep Checks

Provides a router with a single `GET` route (defaults to `/healthcheck`).
Requires an array of URLs to check as configuration.

It checks each of the URLs provided. A `200 OK` response means the service can connect to all services.

If any of the services fails to respond, or returns **any status code other than `2xx`**, the response for this endpoint will be `500 Internal Server Error`.

The details of the erros can be found in the response body.

## 2. Shallow Checks

Cheap check for the service itself, it does not check any underlying services.
Similarly, a `200` status code means the service is up.

## Example

```js
import * as Koa from 'koa';

import { DeepRouter, ShallowRouter } from '@diegoh/koa-healthcheck-routers';

const urls = [
  new URL('http://localhost:11111/healthcheck'),
  new URL('http://localhost:22222/healthcheck'),
  new URL('http://localhost:33333/healthcheck')
];

const app = new Koa();
const healthcheck = new DeepRouter(urls);
const heartbeat = new ShallowRouter();

app.use(healthcheck.routes());
app.use(healthcheck.allowedMethods());
app.use(heartbeat.routes());
app.use(heartbeat.allowedMethods());

app.listen(3000);
```

## Development

1. Create a new branch from `main` with a name relevant to the changes you're making. `git branch -b my-new-feature-description`
2. Push the branch and open a Pull Request.
3. Request a code review, make sure all tests pass.
4. Commits will be **Squash merged** into the mainline to keep things tidy.

## Testing

### Unit

`npm run test:unit`

### Coverage

`npm run test:coverage`

### Integration

`npm run test:integration`

## Lint

`npm run lint` or `npm run lint:fix`
