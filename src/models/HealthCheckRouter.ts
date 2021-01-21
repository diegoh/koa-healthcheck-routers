import { URL } from 'url';
import * as KoaRouter from '@koa/router';
import { Context, Middleware, Next, ParameterizedContext } from 'koa';
import { handler } from '../handlers/healthcheck';
import { HealthCheckState } from './HealthCheckState';

export function setupState(urls: URL[]): Middleware {
  return async (
    ctx: ParameterizedContext<HealthCheckState, Context>,
    next: Next
  ): Promise<void> => {
    ctx.state = new HealthCheckState(urls);
    await next();
  };
}

/**
 * Deep Check: Performs HTTP calls to underlying services.
 * Response is healthy if all underlying services are ok.
 */
export class HealthCheckRouter extends KoaRouter {
  constructor(urls: URL[]) {
    const setConfigStateMiddleware = setupState(urls);

    super();
    super.use(setConfigStateMiddleware);
    super.get('/healthcheck', handler);
  }
}
