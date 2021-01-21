import StatusCodes from 'http-status-codes';
import { DefaultContext, Next, ParameterizedContext } from 'koa';
import { Health } from '../../models/Health';
import { HealthCheckState } from '../../models/HealthCheckState';
import { performServiceCalls } from './performServiceCalls';

export const handler = async (
  ctx: ParameterizedContext<HealthCheckState, DefaultContext>,
  next: Next
): Promise<void> => {
  const result = await performServiceCalls(ctx.state.httpHealthcheckUrls);

  if (!result.isOk) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  ctx.body = new Health();
  await next();
};
