import { URL } from 'url';
import * as Router from '@koa/router';
import { deepHandler } from './deep-handler';
import { setupConfigMiddleware } from './setup-config-middleware';
import { shallowHandler } from './shallow-handler';

export class HttpHealthcheckRouter extends Router {
  constructor(urls?: URL[]) {
    super();

    this.get('/healthcheck', setupConfigMiddleware(urls), deepHandler);
    this.get('/heartbeat', shallowHandler);
  }
}
