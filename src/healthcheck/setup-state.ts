import { URL } from 'url';
import { DefaultContext, Middleware, Next, ParameterizedContext } from 'koa';
import { HealthCheckState } from '../HealthCheckState';

export const setupState = (urls: URL[]): Middleware => async (
  ctx: ParameterizedContext<HealthCheckState, DefaultContext>,
  next: Next
): Promise<void> => {
  ctx.state = new HealthCheckState(urls);
  await next();
};
