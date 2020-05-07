import { URL } from 'url';
import * as KoaRouter from '@koa/router';
import { handler } from './handler';
import { setupState } from './setup-state';

export class HealthCheckRouter extends KoaRouter {
  constructor(urls: URL[]) {
    const setConfigStateMiddleware = setupState(urls);

    super();
    super.use(setConfigStateMiddleware);
    super.get('/healthcheck', handler);
  }
}
