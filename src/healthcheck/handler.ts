import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { DefaultContext, Next, ParameterizedContext } from 'koa';
import { Health } from '../Health';
import { checkHealth } from './check-health';
import { HealthCheckState } from './HealthCheckState';

export const handler = async (
  ctx: ParameterizedContext<HealthCheckState, DefaultContext>,
  next: Next
): Promise<void> => {
  const healthy = await checkHealth(ctx.state.httpHealthcheckUrls);

  if (!healthy) {
    ctx.status = INTERNAL_SERVER_ERROR;
  }

  ctx.body = new Health();
  await next();
};
