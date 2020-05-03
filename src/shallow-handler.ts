import { Middleware } from 'koa';
import { Health } from './models/Health';

export const shallowHandler: Middleware = async (ctx, next) => {
  ctx.body = new Health();
  await next();
};
