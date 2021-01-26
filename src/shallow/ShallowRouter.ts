import * as KoaRouter from '@koa/router';
import { RouterOptions } from '@koa/router';
import { shallowHealthHandler } from './handler';

export class ShallowRouter extends KoaRouter {
  constructor(options?: RouterOptions, urlPath = '/heartbeat') {
    super(options);
    this.get(urlPath, shallowHealthHandler);
  }
}
