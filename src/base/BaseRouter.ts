import * as KoaRouter from '@koa/router';
import { RouterOptions } from '@koa/router';
import { Context, Middleware, Next } from 'koa';

function responseType(): Middleware {
  return async function responseTypeMiddleware(
    ctx: Context,
    next: Next
  ): Promise<void> {
    ctx.type = 'application/health+json';
    await next();
  };
}

export class BaseRouter extends KoaRouter {
  constructor(options?: RouterOptions) {
    super(options);

    this.use(responseType());
  }
}
