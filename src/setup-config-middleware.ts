import { URL } from 'url';
import { Context, Middleware, Next } from 'koa';

export const setupConfigMiddleware = (urls: URL[]): Middleware => {
  return async (ctx: Context, next: Next): Promise<void> => {
    if (urls) {
      if (!ctx.state) {
        ctx.state = {
          healthchecks: {
            http: urls,
          },
        };
      }

      if (!ctx.state.healthchecks) {
        ctx.state.healthchecks = {
          http: urls,
        };
      }

      if (!ctx.state.healthchecks.http) {
        ctx.state.healthchecks.http = urls;
      }
    }

    await next();
  };
};
