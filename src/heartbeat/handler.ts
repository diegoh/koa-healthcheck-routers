import { Middleware } from 'koa';
import { Health } from '../Health';

export const handler: Middleware = async (ctx, next) => {
  ctx.body = new Health();
  await next();
};
