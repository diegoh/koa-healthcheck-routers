import { URL } from 'url';
import { RouterOptions } from '@koa/router';
import { Context, Middleware, Next, ParameterizedContext } from 'koa';
import { BaseRouter } from '../base/BaseRouter';
import { DeepState } from './DeepState';
import { deepHandler } from './handler';

export function setupState(urls: URL[]): Middleware {
  return async (
    ctx: ParameterizedContext<DeepState, Context>,
    next: Next
  ): Promise<void> => {
    ctx.state = new DeepState(urls);
    await next();
  };
}

/**
 * Deep Check: Performs HTTP calls to underlying services.
 * Response is healthy if all underlying services are ok.
 */
export class DeepRouter extends BaseRouter {
  constructor(urls: URL[], options?: RouterOptions, urlPath = '/healthcheck') {
    const setConfigStateMiddleware = setupState(urls);

    super(options);
    this.use(setConfigStateMiddleware);
    this.get(urlPath, deepHandler);
  }
}
