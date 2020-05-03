import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Middleware } from 'koa';
import { checkHealth } from './check-health';
import { Health } from './models/Health';

export const deepHandler: Middleware = async (ctx, next) => {
  let healthy = true;

  if (ctx.state && ctx.state.healthchecks && ctx.state.healthchecks.http) {
    healthy = await checkHealth(ctx.state.healthchecks.http);
  }

  if (!healthy) {
    ctx.status = INTERNAL_SERVER_ERROR;
  }

  ctx.body = new Health();

  await next();
};
