import StatusCodes from 'http-status-codes';
import { DefaultContext, Next, ParameterizedContext } from 'koa';
import { ServiceResponse } from '../base/ServiceResponse';
import { DeepResponse } from './DeepResponse';
import { DeepState } from './DeepState';
import { performServiceCalls } from './performServiceCalls';

export async function deepHandler(
  ctx: ParameterizedContext<DeepState, DefaultContext>,
  next: Next
): Promise<void> {
  const serviceResponses: ServiceResponse[] = await performServiceCalls(
    ctx.state.httpHealthcheckUrls
  );
  const health = new DeepResponse(serviceResponses);

  ctx.body = health;

  if (!health.isHealthy) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    return;
  }

  await next();
}
