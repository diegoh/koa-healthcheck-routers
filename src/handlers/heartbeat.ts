import {
  DefaultContext,
  DefaultState,
  Middleware,
  Next,
  ParameterizedContext
} from 'koa';
import { Health } from '../models/Health';

export const handler: Middleware = async (
  ctx: ParameterizedContext<DefaultState, DefaultContext>,
  next: Next
): Promise<void> => {
  ctx.body = new Health();
  await next();
};
